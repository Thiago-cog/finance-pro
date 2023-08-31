const { Router } = require("express");
const users = require("./controllers/UsersController");
const authenticateToken = require('../Auth/middlewares/AuthMiddleware');

const routes = Router();
routes.get('/users', authenticateToken, users.index);
routes.post('/users/create', authenticateToken, users.create);

module.exports = routes;
