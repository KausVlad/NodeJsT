/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController');
const { check } = require('express-validator');
const accountsMiddleware = require('../middleware/accountMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
  '/registration',
  [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').isLength({ min: 3, max: 10 }),
  ],
  accountController.registration
);
router.post('/login', accountController.login);

router.get('/', accountsMiddleware, accountController.getAccounts);

router.delete('/', roleMiddleware('USER'), accountController.deleteAccount);

module.exports = router;
