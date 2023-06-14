const Account = require('../models/Account');

// Отримати список облікових записів
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get accounts' });
  }
};

// Створити новий обліковий запис
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

module.exports = {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
};
