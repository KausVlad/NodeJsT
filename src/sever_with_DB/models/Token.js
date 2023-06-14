const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Token = sequelize.define('Token', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Token;
