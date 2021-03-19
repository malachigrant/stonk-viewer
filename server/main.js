const StockSocket = require('stocksocket');
const yahoo = require('yahoo-finance');
const each = require('async/each');
const express = require('express');
const {
  loadList,
  loadDashboard,
  createDashboard,
  readDashboard,
} = require('./StorageManager');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: /http:\/\/(?:localhost|192.168.\d{0,3}.\d{0,3}):(?:3000|8080)/,
    methods: ['GET', 'POST'],
  },
});
const port = 3000;

app.use(express.static(`${__dirname}/dist`));

app.use('/admin', express.static(`${__dirname}/admin`));

app.get('/admin/stonks', (req, res) => {
  res.send(`<pre>${JSON.stringify(stonkMap, null, 2)}</pre>`);
});

app.get('/admin/sockets', (req, res) => {
  res.send(`<pre>${JSON.stringify(sockets, null, 2)}</pre>`);
});

const sockets = [];
const stonkMap = {};

const addTicker = (socket, symbol) => {
  if (!stonkMap[symbol]) {
    stonkMap[symbol] = {};
    stonkMap[symbol].sockets = [socket.id];
    StockSocket.addTicker(symbol, (data) => {
      const stonkData = { ...data };
      stonkMap[symbol].price = stonkData.price;
      stonkMap[symbol].lastUpdated = Date.now();
      sendToSockets(symbol, stonkData);
    });
    yahoo.quote(
      {
        symbol: symbol,
        modules: ['price'],
      },
      (err, quote) => {
        if (err) {
          return;
        }
        const data = {
          price: quote.price.regularMarketPrice,
          previousClose: quote.price.regularMarketPreviousClose,
        };
        stonkMap[symbol] = { ...stonkMap[symbol], ...data };
        socket.emit('dataChanged', { symbol, ...data });
      }
    );
  } else {
    stonkMap[symbol].sockets = [...stonkMap[symbol].sockets, socket.id];
    socket.emit('dataChanged', {
      symbol,
      price: stonkMap[symbol].price,
      previousClose: stonkMap[symbol].previousClose,
    });
  }
};

const sendToSockets = (symbol, data) => {
  if (stonkMap[symbol]) {
    stonkMap[symbol].sockets.forEach((socketId) => {
      sockets[socketId].emit('dataChanged', data);
    });
  }
};

const addTickers = (socket, list) => {
  each(list, (stonk) => {
    addTicker(socket, stonk);
  });
};

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  sockets[socket.id] = socket;
  console.log('user connected');
  socket.on('addStonk', (symbol) => {
    addTicker(socket, symbol);
  });

  socket.on('addStonks', (list) => {
    addTickers(socket, list);
  });

  socket.on('loadList', (name, cb) => {
    loadList(name, (data) => {
      cb(data.symbols);
      addTickers(socket, data.symbols);
    });
  });

  socket.on('loadDashboard', (name, cb) => {
    loadDashboard(name, (data) => {
      cb(data);
      if (!data.lists) {
        return;
      }
      data.lists.forEach((list) => {
        addTickers(socket, list.symbols);
      });
    });
  });

  socket.on('createDashboard', (name, data, cb) => {
    createDashboard(name, data, cb);
  });

  socket.on('readDashboard', (name, cb) => {
    readDashboard(name, cb);
  });
});

app.use((req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
