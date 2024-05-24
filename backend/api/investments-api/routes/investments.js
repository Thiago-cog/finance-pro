const { Router } = require('express');
const authenticateToken = require('./middleware/authenticateToken.js');
const InvestmentsMaintenance = require('../component/investments-maintenance.js');
const WalletsRepository = require('../component/data/wallets-repository.js');
const InvestmentsRepository = require('../component/data/investments-repository.js');
const TypeInvestmentsRepository = require('../component/data/type-investments-repository.js');

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
    const investmentsMaintenance = new InvestmentsMaintenance(new WalletsRepository(), new InvestmentsRepository(), null);
    const quoteData = req.body;
    const result = await investmentsMaintenance.addQuoteInWallet(quoteData);
    applyResult(result, res);
});

router.get('/get-wallets', authenticateToken, async (req, res) => {
    const investmentsMaintenance = new InvestmentsMaintenance(new WalletsRepository(), null);
    const userId = parseInt(req.query.userId);
    const result = await investmentsMaintenance.getAllWalletsByUserId(userId);
    applyResult(result, res);
});

router.get('/get-type-investments', authenticateToken, async (req, res) => {
    const investmentsMaintenance = new InvestmentsMaintenance(null, null, new TypeInvestmentsRepository());
    const result = await investmentsMaintenance.getTypeInvestments();
    applyResult(result, res);
});

router.get('/get-all-wallet-data', authenticateToken, async (req, res) => {
    const investmentsMaintenance = new InvestmentsMaintenance(new WalletsRepository(), new InvestmentsRepository(), new TypeInvestmentsRepository());
    const userId = parseInt(req.query.userId);
    const result = await investmentsMaintenance.getAllWalletData(userId);
    applyResult(result, res);
});

module.exports = router;