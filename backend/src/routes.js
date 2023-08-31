const { Router } = require("express");
const authRoutes = require('./app/Auth/routes');
const usersRoutes = require('./app/Users/routes');

const routes = Router();
routes.use(authRoutes);
routes.use(usersRoutes);

module.exports = routes;