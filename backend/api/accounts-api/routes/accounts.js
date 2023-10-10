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
    const result = accountsMaintenance.tes();
    applyResult(result, res);
});