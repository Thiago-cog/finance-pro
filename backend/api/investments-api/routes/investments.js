const { Router } = require('express');
const authenticateToken = require('./middleware/authenticateToken.js');
const InvestmentsMaintenance = require('../component/investments-maintenance.js');
const WalletsRepository = require('../component/data/wallets-repository.js');
const InvestmentsRepository = require('../component/data/investments-repository.js');



const router = Router();

const applyResult = (result, res) => {
    if (result.errors) {
        res.status(result.status);
        return res.send(result.errors);
    }
    res.status(result.status);
    return res.send(result.data);
};

router.post('/create-wallet/:userId', authenticateToken, async (req, res) => {
    const investmentsMaintenance = new InvestmentsMaintenance(new WalletsRepository(), null);
    const walletData = req.body;
    walletData.userId = parseInt(req.params.userId);
    const result = await investmentsMaintenance.createWallet(walletData);
    applyResult(result, res);
});

router.post('/add-quote', authenticateToken, async (req, res) => {
    const investmentsMaintenance = new InvestmentsMaintenance(new WalletsRepository(), new InvestmentsRepository());
    const quoteData = req.body;
    const result = await investmentsMaintenance.addQuoteInWallet(quoteData);
    applyResult(result, res);
});

module.exports = router;