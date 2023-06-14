const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Account = sequelize.define('Account', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Account;
