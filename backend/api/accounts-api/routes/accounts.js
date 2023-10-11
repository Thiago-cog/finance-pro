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
    const userId = parseInt(req.params.userId)
    const result = accountsMaintenance.getAccountsByUserId(userId);
    applyResult(result, res);
});

router.post('/create-accounts', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const accountData = req.body;
    const result = accountsMaintenance.createAccount(accountData);
    applyResult(result, res);
});

router.post('/create-card', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    const cardData = req.body;
    const result = accountsMaintenance.createCard(cardData);
    applyResult(result, res);
});

router.post('/create-revenue', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    
    applyResult(result, res);
});

router.post('/create-expense-extract', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    
    applyResult(result, res);
});

router.post('/create-chargeback', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    
    applyResult(result, res);
});

router.post('/create-expense-invoice', authenticateToken, async(req, res) => {
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    
    applyResult(result, res);
});