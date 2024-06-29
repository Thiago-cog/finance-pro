const { Router } = require('express');
const authenticateToken = require('./middleware/authenticateToken.js');

const AccountsMaintenance = require('../component/accounts-maintenance.js');
const AccountsRepository = require('../component/data/accounts-repository.js');

const router = Router();

const applyResult = (result, res) => {
    if (result.errors) {
        res.status(result.status);
        return res.send(result.errors);
    }
    res.status(result.status);
    return res.send(result.data);
};

router.get('/get-accounts/:userId', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const userId = parseInt(req.params.userId);
    const result = await accountsMaintenance.getAccountsByUserId(userId);
    applyResult(result, res);
});

router.get('/get-card/:userId', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const userId = parseInt(req.params.userId);
    const result = await accountsMaintenance.getAllCardsByUserId(userId);
    applyResult(result, res);
});

router.get('/get-all-status/:userId', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const userId = parseInt(req.params.userId);
    const result = await accountsMaintenance.getAllStatusByUserId(userId);
    applyResult(result, res);
});

router.get('/get-all-moviments/:userId', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const userId = parseInt(req.params.userId);
    const result = await accountsMaintenance.getAllMovimentsByUserId(userId);
    applyResult(result, res);
});

router.get('/get-categories', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const result = await accountsMaintenance.getcategories();
    applyResult(result, res);
});

router.post('/create-accounts', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const accountData = req.body;
    const result = await accountsMaintenance.createAccount(accountData);
    applyResult(result, res);
});

router.post('/create-card', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const cardData = req.body;
    const result = await accountsMaintenance.createCard(cardData);
    applyResult(result, res);
});

router.post('/create-movement-extract', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const movementExtractData = req.body;
    const result = await accountsMaintenance.createMovementExtract(movementExtractData);
    applyResult(result, res);
});

router.post('/create-movement-invoice', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const movementInvoiceData = req.body;
    const result = await accountsMaintenance.createMovementInvoice(movementInvoiceData);
    applyResult(result, res);
});

router.get('/get-total-revenue/:userId', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const userId = parseInt(req.params.userId);
    const result = await accountsMaintenance.getTotalRevenueByUserId(userId);
    applyResult(result, res);
});

router.get('/get-total-expenses/:userId', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const userId = parseInt(req.params.userId);
    const result = await accountsMaintenance.getTotalExpensesByUserId(userId);
    applyResult(result, res);
});

router.get('/get-revenue-expenses/', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const userId = parseInt(req.query.userId);
    const result = await accountsMaintenance.getRevenueAndExpensesByUserId(userId);
    applyResult(result, res);
});

router.delete('/delete-transaction', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const transactionId = parseInt(req.query.transactionId);
    const result = await accountsMaintenance.deleteTransaction(transactionId);
    applyResult(result, res);
});

router.delete('/delete-account', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const accountId = parseInt(req.query.accountId);
    const result = await accountsMaintenance.deleteAccount(accountId);
    applyResult(result, res);
});

router.delete('/delete-card', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const cardId = parseInt(req.query.cardId);
    const result = await accountsMaintenance.deleteCard(cardId);
    applyResult(result, res);
});
module.exports = router;