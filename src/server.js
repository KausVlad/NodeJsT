const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Масив для зберігання облікових записів
let accounts = [];

// Масив для зберігання токенів
let tokens = [];

// Ендпоінт: Отримати список облікових записів
app.get('/accounts', (req, res) => {
  res.json(accounts);
});

// Ендпоінт: Створити обліковий запис
app.post('/accounts', (req, res) => {
  const newAccount = req.body;
  accounts.push(newAccount);
  res.json(newAccount);
});

// Ендпоінт: Змінити обліковий запис
app.put('/accounts/:id', (req, res) => {
  const accountId = req.params.id;
  const updatedAccount = req.body;

  accounts = accounts.map((account) => {
    if (account.id === accountId) {
      return { ...account, ...updatedAccount };
    }
    return account;
  });

  res.json(updatedAccount);
});

// Ендпоінт: Видалити обліковий запис (тільки для ролі "Адмін")
app.delete('/accounts/:id', (req, res) => {
  const accountId = req.params.id;
  const role = req.query.role;

  if (role === 'Адмін') {
    accounts = accounts.filter((account) => account.id !== accountId);
    res.json({ message: 'Обліковий запис успішно видалено.' });
  } else {
    res
      .status(401)
      .json({ message: 'Недостатньо прав для видалення облікового запису.' });
  }
});

// Ендпоінт: Отримати список токенів облікового запису
app.get('/accounts/:id/tokens', (req, res) => {
  const accountId = req.params.id;
  const accountTokens = tokens.filter((token) => token.accountId === accountId);
  res.json(accountTokens);
});

// Ендпоінт: Отримати список всіх токенів
app.get('/tokens', (req, res) => {
  res.json(tokens);
});

// Ендпоінт: Створити токен
app.post('/tokens', (req, res) => {
  const newToken = req.body;
  tokens.push(newToken);
  res.json(newToken);
});

// Ендпоінт: Змінити токен
app.put('/tokens/:id', (req, res) => {
  const tokenId = req.params.id;
  const updatedToken = req.body;

  tokens = tokens.map((token) => {
    if (token.id === tokenId) {
      return { ...token, ...updatedToken };
    }
    return token;
  });

  res.json(updatedToken);
});

// Ендпоінт: Видалити токен
app.delete('/tokens/:id', (req, res) => {
  const tokenId = req.params.id;
  tokens = tokens.filter((token) => token.id !== tokenId);
  res.json({ message: 'Токен успішно видалено.' });
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущено на порті 3000');
});
