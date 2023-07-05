const io = require('socket.io-client');
const socket = io('http://localhost:3000');

// Порівняння швидкості через WebSocket
const startTimeWS = new Date().getTime();
socket.emit('sendDataWS');
socket.on('dataWS', (data) => {
  const endTimeWS = new Date().getTime();
  const transferTimeWS = endTimeWS - startTimeWS;
  console.log('Transfer time via WebSocket:', transferTimeWS + 'ms');
});

// Порівняння швидкості через HTTP polling
const startTimeHTTP = new Date().getTime();
socket.emit('sendDataHTTP');
socket.on('dataHTTP', (data) => {
  const endTimeHTTP = new Date().getTime();
  const transferTimeHTTP = endTimeHTTP - startTimeHTTP;
  console.log('Transfer time via HTTP polling:', transferTimeHTTP + 'ms');
});
