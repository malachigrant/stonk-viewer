StockSocket = require('stocksocket');

const TICKERS = ['TSLA', 'GME', 'MSFT', 'AMZN', 'AAPL', 'GOOG'];

StockSocket.addTickers(TICKERS, (data) => {
  console.log(data);
})