const { Request, Response } = require("express");
const AuthService = require("../services/AuthService");
const AuthError = require("../exceptions/AuthError");

class AuthController {
    async login(req, res) {
        const { email, password } = req.body;

        try {
            const authService = new AuthService();
            const { user, token } = await authService.singIn(email, password);
            return res.status(200).json({ user, token });
        } catch (error) {
            if (error instanceof AuthError) return res.status(401).send();
            return res.status(500).send({ error });
        }
    }

    async logout(req, res) {
        const authService = new AuthService();
        await authService.singOut(req.user.token);
        return res.status(204).send();
    }
}

module.exports = new AuthController();
