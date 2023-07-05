const io = require('socket.io-client');

// Підключення до сервера
const socket = io.connect('http://localhost:3000');

// Відправлення повідомлення на сервер
socket.emit('message', 'Привіт, сервер!');

// Обробник отримання повідомлення від сервера
socket.on('message', (data) => {
  console.log('Повідомлення від сервера:', data);
});

// Обробник відключення від сервера
socket.on('disconnect', () => {
  console.log('Відключено від сервера');
});
