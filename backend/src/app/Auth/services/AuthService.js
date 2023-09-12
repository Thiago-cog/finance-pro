const jwt = require('jsonwebtoken');
const AuthError = require("../exceptions/AuthError");
const config = require('../../../config');
const { get, set } = require('../../../lib/redis');
const Database = require('../../../lib/database');
const bcrypt = require('bcrypt');

class AuthService {
    constructor() {
        this.databaseConnector = new Database();
    }

    async singIn(email, password) {
        const conn = await this.databaseConnector.generateConnection();

        try{
            const result = await conn.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            const { id, fullname } = user;
            const userToken = {
                id,
                fullname,
                email
            }

            // verifica se o usuário já está logado pelo redis.
            const userSession = await get(`user_session_token:${id}`);

            if (!passwordMatch) {
                throw new AuthError('Senha não confere!');
            }

            if (email !== user.email) {
                throw new AuthError('Email não confere!');
            }

            const token = jwt.sign({ userToken }, config.auth.secret, {
                expiresIn: config.auth.expiresIn
            });
            
            await set(`user_session_token:${id}`, token);

            return {
                user: {
                    id,
                    fullname,
                    email,
                },
                token,
                status: 200,
                message: "Usuário logado com sucesso!"
            };
        }catch(error){
            return {
                status: 401,
                message: error.message
            }
        }
        
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
            return decoded.userToken;
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
