const express = require('express');
const app = express();
const accountRoutes = require('./routes/accountRoutes');
const db = require('./database'); // Імпортуємо підключення до бази даних

app.use(express.json());

app.use('/accounts', accountRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
