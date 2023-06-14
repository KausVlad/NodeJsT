const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'postgres://postgres:1314@localhost:5432/postgres'
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');

    // Створення таблиць, якщо вони не існують
    await sequelize.sync({ alter: true });
    console.log('Database tables created');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
})();

module.exports = sequelize;
