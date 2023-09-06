const { Router } = require("express");
const accountsController = require("./controllers/AccountsController");
const authenticateToken = require('../Auth/middlewares/AuthMiddleware');

const routes = Router();
routes.post('/accounts/create-accounts', authenticateToken, accountsController.createAccounts);
routes.post('/accounts/create-card', authenticateToken, accountsController.createCard);
routes.post('/accounts/create-revenue', authenticateToken, accountsController.createMovementExtract);
routes.post('/accounts/create-expense', authenticateToken, accountsController.createMovementExtract);

module.exports = routes;