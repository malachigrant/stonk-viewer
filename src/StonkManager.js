import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
const map = {};

export const addTicker = (symbol, cb) => {
  socket.emit('addStonk', symbol);
  map[symbol] = cb;
};

export const addTickers = (list, cb) => {
  socket.emit('addStonks', list);
  list.forEach((stonk) => {
    map[stonk] = cb;
  })
}

export const loadList = (name, cb) => {
  socket.emit('loadList', name, (list) => {
    list.forEach((stonk) => {
      cb({ symbol: stonk, price: '...' });
      map[stonk] = cb; // TODO: this may cause issues if we have the same ticker in multiple lists...
    })
  });
}

socket.on('dataChanged', (data) => {
  if (typeof map[data.symbol] === 'function') {
    const returnValue = { ...data };
    map[data.symbol](returnValue);
  }
});
