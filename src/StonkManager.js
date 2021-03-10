import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
const map = {};

export const addTicker = (symbol, cb) => {
  socket.emit('addTicker', symbol);
  map[symbol] = cb;
}

socket.on('dataChanged', (data) => {
  if (typeof(map[data.symbol]) === 'function') {
    map[data.symbol](data.price);
  }
});
