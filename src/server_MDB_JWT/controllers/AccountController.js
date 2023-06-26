/* eslint-disable @typescript-eslint/no-var-requires */
const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('../secret');

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

const registration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ massage: 'Registration failed', errors });
    }
    const { username, password } = req.body;
    const potentialUser = await User.findOne({ username });
    if (potentialUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 5);
    const userRole = await Role.findOne({ value: 'USER' });
    const user = new User({
      username,
      password: hash,
      roles: [userRole.value],
    });
    await user.save();
    return res.json({ message: 'User created successfully', user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Registration failed ' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    const token = generateAccessToken(user._id, user.roles);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Failed to login' });
  }
};

const getAccounts = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get accounts' });
  }
};

const deleteAccount = async (req, res) => {
  const { username } = req.body;
  try {
    const account = await User.findOneAndDelete({ username: username });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json({ message: 'Account deleted successfully', username });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete account' });
  }
};

module.exports = {
  registration,
  login,
  getAccounts,
  deleteAccount,
};
