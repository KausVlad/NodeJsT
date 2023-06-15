const mongoose = require('mongoose');

const mongoDBUri = 'mongodb+srv://F1:1234@cluster0.8xenowa.mongodb.net/';

mongoose
  .connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

const db = mongoose.connection;

module.exports = db;
