const io = require('socket.io-client');
const socket = io('http://localhost:3000');

// Відправка повідомлення на сервер
socket.emit('message', 'Hello, server!');

// Обробка події 'response' від сервера
socket.on('response', (data) => {
  console.log('Received response from server:', data);
});

// Обробка події 'disconnect' при відключенні від сервера
socket.on('disconnect', () => {
  console.log('Disconnected from server.');
});
