const io = require('socket.io')(3000);

function generateLargeData(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let data = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    data += characters.charAt(randomIndex);
  }

  return data;
}

io.on('connection', (socket) => {
  console.log('A client connected.');

  // Відправка великих даних через WebSocket
  socket.on('sendDataWS', () => {
    const data = generateLargeData(); // Функція для генерації великих даних
    socket.emit('dataWS', data);
  });

  // Відправка великих даних через HTTP polling
  socket.on('sendDataHTTP', () => {
    const data = generateLargeData(); // Функція для генерації великих даних
    socket.emit('dataHTTP', data);
  });
});
