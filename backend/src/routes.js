const { Router } = require("express");
const authRoutes = require('./app/Auth/routes');
const usersRoutes = require('./app/Users/routes');
const accountsRoutes = require('./app/Accounts/routes');

const routes = Router();
routes.use(authRoutes);
routes.use(usersRoutes);
routes.use(accountsRoutes);

module.exports = routes;