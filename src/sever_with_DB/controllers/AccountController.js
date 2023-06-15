const Account = require('../models/Account');
const Token = require('../models/Token');

// Отримати список облікових записів
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get accounts' });
  }
};

// Створити обліковий запис
const createAccount = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const account = new Account({ username, password, role });
    await account.save();
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
    const account = await Account.findByIdAndUpdate(
      id,
      { username, password, role },
      { new: true }
    );
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
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
    const account = await Account.findByIdAndDelete(id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete account' });
  }
};

// Отримати список токенів облікового запису
const getAccountTokens = async (req, res) => {
  const { id } = req.params;
  try {
    const tokens = await Token.find({ accountId: id });
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get account tokens' });
  }
};

// Отримати список всіх токенів
const getAllTokens = async (req, res) => {
  try {
    const tokens = await Token.find();
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
    const token = new Token({ name, accountId });
    await token.save();
    const tokenString = `${name}-${token._id}`;
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
    const token = await Token.findByIdAndUpdate(id, { name }, { new: true });
    if (!token) {
      return res.status(404).json({ error: 'Token not found' });
    }
    res.json(token);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update token' });
  }
};

// Видалити токен
const deleteToken = async (req, res) => {
  const { id } = req.params;
  try {
    const token = await Token.findByIdAndDelete(id);
    if (!token) {
      return res.status(404).json({ error: 'Token not found' });
    }
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
