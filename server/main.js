StockSocket = require('stocksocket');
yahoo = require('yahoo-finance');
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
      sendToSockets(symbol, data);
    });
    yahoo.quote(
      {
        symbol: symbol,
        modules: ['price'],
      },
      (err, quote) => {
        console.log(quote);
        socket.emit('dataChanged', {
          symbol,
          price: quote.price.regularMarketPrice,
          previousClose: quote.price.regularMarketPreviousClose,
        });
      }
    );
  } else {
    stonkMap[symbol].sockets = [...stonkMap[symbol].sockets, socket.id];
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

io.on('connection', (socket) => {
  sockets[socket.id] = socket;
  console.log('user connected');
  socket.on('addTicker', (symbol) => {
    addTicker(socket, symbol);
  });
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const TICKERS = ['TSLA', 'GME', 'MSFT', 'AMZN', 'AAPL', 'GOOG'];
