const StockSocket = require('stocksocket');
const yahoo = require('yahoo-finance');
const each = require('async/each');
const fs = require('fs');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
});
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const sockets = [];
const stonkMap = {};

const addTicker = (socket, symbol) => {
  if (!stonkMap[symbol]) {
    stonkMap[symbol] = {};
    stonkMap[symbol].sockets = [socket.id];
    StockSocket.addTicker(symbol, (data) => {
      const stonkData = { ...data }
      stonkData.price = stonkData.price.replace(',', '');
      stonkData.price = parseFloat(stonkData.price);
      stonkMap[symbol].price = stonkData.price;
      sendToSockets(symbol, stonkData);
    });
    yahoo.quote(
      {
        symbol: symbol,
        modules: ['price'],
      },
      (err, quote) => {
        // console.log(quote);
        const data = {
          price: quote.price.regularMarketPrice,
          previousClose: quote.price.regularMarketPreviousClose,
        }
        stonkMap[symbol] = { ...stonkMap[symbol], ...data };
        socket.emit('dataChanged', { symbol, ...data });
      }
    );
  } else {
    stonkMap[symbol].sockets = [...stonkMap[symbol].sockets, socket.id];
    socket.emit('dataChanged', {
      symbol,
      price: stonkMap[symbol].price,
      previousClose: stonkMap[symbol].previousClose
    });
  }
};

const sendToSockets = (symbol, data) => {
  // console.log(data);
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
}

io.on('connection', (socket) => {
  sockets[socket.id] = socket;
  console.log('user connected');
  socket.on('addStonk', (symbol) => {
    addTicker(socket, symbol);
  });

  socket.on('addStonks', (list) => {
    addTickers(socket, list);
  });

  socket.on('loadList', (name, cb) => {
    fs.readFile(`${__dirname}/lists/${name}.json`, (err, data) => {
      if (err) {
        cb([]);
        return;
      }
      const jsonData = JSON.parse(data);
      cb(jsonData.symbols);
      addTickers(socket, jsonData.symbols);
    });
  });
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
