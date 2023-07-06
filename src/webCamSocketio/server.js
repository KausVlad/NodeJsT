/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

// Налаштування шляху до веб-сторінки з клієнтським кодом
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
// Встановлення з'єднання з клієнтом
io.on('connection', (socket) => {
  console.log('Клієнт підключився');

  // Отримання зображення з вебкамери клієнта
  socket.on('stream', (image) => {
    socket.broadcast.emit('stream', image);
  });

  // Відключення з'єднання клієнта
  socket.on('disconnect', () => {
    console.log('Клієнт відключився');
  });
});

// Запуск сервера
const port = 3000;
server.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});
