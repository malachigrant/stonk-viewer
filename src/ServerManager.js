import { io } from 'socket.io-client';
const socket = io(SOCKET_URL);

export const createDashboard = (name, data, cb) => {
  socket.emit('createDashboard', name, data, cb);
};

export const readDashboard = (name, cb) => {
  socket.emit('readDashboard', name, cb);
};
