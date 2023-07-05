/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const mongoose = require('mongoose');
const { ServiceBroker } = require('moleculer');
const jwt = require('jsonwebtoken');

// Конфігурація бази даних MDB
mongoose
  .connect('mongodb+srv://F1:1234@cluster0.8xenowa.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Модель користувача
const User = mongoose.model(
  'User',
  new mongoose.Schema({
    username: String,
    password: String,
  })
);

// Функція для генерації JWT
function generateToken(user) {
  const payload = { username: user.username };
  return jwt.sign(payload, 'secret_key', { expiresIn: '1h' });
}

// Мікросервіси Moleculer
const broker = new ServiceBroker();

broker.createService({
  name: 'users',
  actions: {
    login(ctx) {
      const { username, password } = ctx.params;

      return User.findOne({ username, password })
        .exec()
        .then((user) => {
          if (!user)
            return Promise.reject(new Error('Invalid username or password'));

          const token = generateToken(user);
          return { token };
        });
    },

    registration(ctx) {
      const { username, password } = ctx.params;

      return User.create({ username, password }).then((user) => {
        const token = generateToken(user);
        return { token };
      });
    },

    getAllUsers() {
      return User.find().exec();
    },

    deleteUser(ctx) {
      const { username } = ctx.params;

      return User.findOneAndDelete({ username })
        .exec()
        .then((user) => {
          if (!user) return Promise.reject(new Error('User not found'));

          return { message: 'User deleted' };
        });
    },
  },
});

// Express-сервер
const app = express();
app.use(express.json());

app.post('/login', (req, res) => {
  broker
    .call('users.login', req.body)
    .then((result) => res.json(result))
    .catch((err) => res.status(401).json({ error: err.message }));
});

app.post('/registration', (req, res) => {
  broker
    .call('users.registration', req.body)
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.get('/', (req, res) => {
  broker
    .call('users.getAllUsers')
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete('/', (req, res) => {
  broker
    .call('users.deleteUser', req.body)
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.listen(3000, () => {
  ('Сервер запущено на порту 3000');
});

// Запуск Moleculer-брокера
broker.start();
