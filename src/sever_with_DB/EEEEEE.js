const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize(
  'postgres://postgres:1314@localhost:5432/postgres'
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define(
  'user',
  {
    // attributes
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    tablaName: 'test users',
  }
);

User.sync();

app.post('/user', async (req, res) => {
  try {
    console.log('request:: ', req.body);

    const newUser = new User(req.body);
    console.log('New user: ', newUser);
    await newUser.save();

    res.json({ user: newUser }); // Returns the new user that is created in the database
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // Returns the new user that is created in the database
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.delete('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.destroy({ where: { id: userId } });

    if (deletedUser) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Початкові дані для облікових записів і токенів (можна замінити на базу даних)
let accounts = [
  { id: 1, username: 'admin', password: 'admin', role: 'Admin' },
  { id: 2, username: 'user1', password: 'user1', role: 'User' },
  { id: 3, username: 'user2', password: 'user2', role: 'User' },
];

let tokens = [];

// Отримати список облікових записів
app.get('/accounts', (req, res) => {
  res.json(accounts);
});

// Створити обліковий запис
app.post('/accounts', (req, res) => {
  const { username, password, role } = req.body;
  const id = accounts.length + 1;
  const newAccount = { id, username, password, role };
  accounts.push(newAccount);
  res.json(newAccount);
});

// Змінити обліковий запис
app.put('/accounts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { username, password, role } = req.body;
  const account = accounts.find((acc) => acc.id === id);
  if (!account) {
    res.status(404).json({ error: 'Account not found' });
  } else {
    account.username = username;
    account.password = password;
    account.role = role;
    res.json(account);
  }
});

// Видалити обліковий запис (тільки для адміна)
app.delete('/accounts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { username, password, role } = req.query;

  // Перевірка наявності прав адміна
  const adminAccount = accounts.find(
    (acc) =>
      acc.username === username &&
      acc.password === password &&
      acc.role === 'Admin'
  );
  if (!adminAccount) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    accounts = accounts.filter((acc) => acc.id !== id);
    res.json({ message: 'Account deleted' });
  }
});

// Отримати список токенів облікового запису
app.get('/accounts/:id/tokens', (req, res) => {
  const id = parseInt(req.params.id);
  const accountTokens = tokens.filter((token) => token.accountId === id);
  res.json(accountTokens);
});

// Отримати список всіх токенів
app.get('/tokens', (req, res) => {
  res.json(tokens);
});

// Створити токен
app.post('/tokens', (req, res) => {
  const { accountId, token } = req.body;
  const newToken = { accountId, token };
  tokens.push(newToken);
  res.json(newToken);
});

// Змінити токен
app.put('/tokens/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { token } = req.body;
  const existingToken = tokens.find((t) => t.accountId === id);
  if (!existingToken) {
    res.status(404).json({ error: 'Token not found' });
  } else {
    existingToken.token = token;
    res.json(existingToken);
  }
});

// Видалити токен
app.delete('/tokens/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tokens = tokens.filter((t) => t.accountId !== id);
  res.json({ message: 'Token deleted' });
});

// Запускаємо сервер на порту 3000
app.listen(3030, () => {
  console.log('Server started on port 3000');
});

/* 
GET /accounts - Отримати список облікових записів
POST /accounts - Створити обліковий запис
PUT /accounts/:id - Змінити обліковий запис
DELETE /accounts/:id - Видалити обліковий запис

GET /accounts/:id/tokens - Отримати список токенів облікового запису
GET /tokens - Отримати список всіх токенів
POST /tokens - Створити токен
PUT /tokens/:id - Змінити токен
DELETE /tokens/:id - Видалити токен
*/
