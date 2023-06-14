const Account = require('../models/Account');
const Token = require('../models/Token');

// Отримати список облікових записів
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get accounts' });
  }
};

// Створити обліковий запис
const createAccount = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const account = await Account.create({ username, password, role });
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create account' });
  }
};

// Змінити обліковий запис
const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;
  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    account.username = username;
    account.password = password;
    account.role = role;
    await account.save();
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update account' });
  }
};

// Видалити обліковий запис
const deleteAccount = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.query;
  // Перевірка прав адміна
  if (username !== 'admin' || password !== 'admin') {
    return res.status(403).json({ error: 'Only admin can delete accounts' });
  }
  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    await account.destroy();
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete account' });
  }
};

// Отримати список токенів облікового запису
const getAccountTokens = async (req, res) => {
  const { id } = req.params;
  try {
    const tokens = await Token.findAll({ where: { accountId: id } });
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get account tokens' });
  }
};

// Отримати список всіх токенів
const getAllTokens = async (req, res) => {
  try {
    const tokens = await Token.findAll();
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get all tokens' });
  }
};

// Створити токен
const createToken = async (req, res) => {
  const { accountId } = req.params;
  const { name } = req.body;
  try {
    const token = await Token.create({ name, accountId });
    const tokenString = `${name}-${token.id}`;
    res.json({ token: tokenString });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create token' });
  }
};

// Змінити токен
const updateToken = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const token = await Token.findByPk(id);
    if (!token) {
      return res.status(404).json({ error: 'Token not found' });
    }
    token.name = name;
    await token.save();
    res.json(token);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update token' });
  }
};

// Видалити токен
const deleteToken = async (req, res) => {
  const { id } = req.params;
  try {
    const token = await Token.findByPk(id);
    if (!token) {
      return res.status(404).json({ error: 'Token not found' });
    }
    await token.destroy();
    res.json({ message: 'Token deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete token' });
  }
};

module.exports = {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountTokens,
  getAllTokens,
  createToken,
  updateToken,
  deleteToken,
};
