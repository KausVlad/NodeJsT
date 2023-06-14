const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController');

router.get('/', accountController.getAccounts);
router.post('/', accountController.createAccount);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);
router.get('/:id/tokens', accountController.getAccountTokens);
router.get('/tokens', accountController.getAllTokens);
router.post('/:accountId/tokens', accountController.createToken);
router.put('/tokens/:id', accountController.updateToken);
router.delete('/tokens/:id', accountController.deleteToken);

module.exports = router;
