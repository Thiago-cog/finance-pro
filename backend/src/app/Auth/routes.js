const { Router } = require("express");
const auth = require("./controllers/AuthController");
const authenticateToken = require('./middlewares/AuthMiddleware');

const routes = Router();
routes.post('/auth/login', auth.login);
routes.get('/auth/decode-token', authenticateToken, auth.decode);
routes.delete('/auth/logout', authenticateToken, auth.logout);

module.exports = routes;
