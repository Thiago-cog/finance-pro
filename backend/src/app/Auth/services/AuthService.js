const jwt = require('jsonwebtoken');
const AuthError = require("../exceptions/AuthError");
const config = require('../../../config');
const { get, set } = require('../../../lib/redis');
const Database = require('../../../lib/database');

class AuthService {
    constructor() {
        this.databaseConnector = new Database();
    }

    async singIn(email, password) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        const user = result.rows[0];

        if (email !== user.email && password !== user.password) {
            throw new AuthError('Email e Senha não confere!');
        }

        if (email !== user.email) {
            throw new AuthError('Email não confere!');
        }

        if (password !== user.password) {
            throw new AuthError('Senha não confere!');
        }

        const { id, fullName } = user;

        const token = jwt.sign({ id }, config.auth.secret, {
            expiresIn: config.auth.expiresIn
        });

        return {
            user: {
                id,
                fullName,
                email,
            },
            token,
        };
    }

    async singOut(token) {
        await this.blackListToken(token);
    }

    async validateToken(token) {
        try {
            if (await this.isTokenBlackListed(token)) {
                throw new AuthError('Token está na BlackList');
            }
            const decoded = jwt.verify(token, config.auth.secret);
            return decoded.id;
        } catch (error) {
            throw new AuthError('Token inválido');
        }
    }

    async isTokenBlackListed(token) {
        const blackListedToken = await get(`tokens:invalidated:${token}`);
        return !!blackListedToken;
    }

    async blackListToken(token) {
        await set(`tokens:invalidated:${token}`, true);
    }
}

module.exports = AuthService;
