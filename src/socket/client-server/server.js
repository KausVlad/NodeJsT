const io = require('socket.io')(3000);

io.on('connection', (socket) => {
  console.log('A client connected.');

  // Обробка події 'message' від клієнта
  socket.on('message', (data) => {
    console.log('Received message from client:', data);
    // Відправка відповіді клієнту
    socket.emit('response', 'Server received your message.');
  });

  // Обробка події 'disconnect' при відключенні клієнта
  socket.on('disconnect', () => {
    console.log('A client disconnected.');
  });
});
