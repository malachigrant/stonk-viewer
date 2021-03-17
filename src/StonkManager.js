import { io } from 'socket.io-client';
const socket = io(SOCKET_URL);
const map = {};

const updateMap = (symbol, cb) => {
  map[symbol] = map[symbol] ? [...map[symbol], cb] : [cb];
};

export const addTicker = (symbol, cb) => {
  socket.emit('addStonk', symbol);
  updateMap(symbol, cb);
};

export const addTickers = (list, cb) => {
  socket.emit('addStonks', list);
  list.forEach((symbol) => {
    updateMap(symbol, cb);
  });
};

export const loadList = (name, cb) => {
  socket.emit('loadList', name, (list) => {
    list.forEach((symbol) => {
      cb({ symbol, price: '...' });
      updateMap(symbol, cb);
    });
  });
};

export const loadDashboard = (name, cb, initCb) => {
  socket.emit('loadDashboard', name, (data) => {
    initCb(data);
    data.lists.forEach((listData) => {
      listData.symbols.forEach((symbol) => {
        updateMap(symbol, cb);
      });
    });
  });
};

socket.on('dataChanged', (data) => {
  if (map[data.symbol]) {
    const returnValue = { ...data };
    map[data.symbol].forEach((cb) => {
      cb(returnValue);
    });
  }
});
