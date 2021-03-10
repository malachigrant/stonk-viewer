StockSocket = require('stocksocket');
const app = require('express')()
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: {
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST']
}});
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('addTicker', (symbol) => {
    StockSocket.addTicker(symbol, (data) => {
      socket.emit('dataChanged', data);
    });
  });
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const TICKERS = ['TSLA', 'GME', 'MSFT', 'AMZN', 'AAPL', 'GOOG'];