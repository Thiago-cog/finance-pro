const Database = require('../../../lib/database');
const UsersError = require("../exceptions/UsersError");
const bcrypt = require('bcrypt');

class AuthService {
    constructor() {
        this.databaseConnector = new Database();
        this.saltRounds = 10;
    }

    async createUser(email, password, fullname) {
        const conn = await this.databaseConnector.generateConnection();
        const hash = await bcrypt.hash(password, this.saltRounds);

        try {
            conn.query("INSERT INTO users(id, email, password, fullname) VALUES(nextval('seq_users_id'), $1, $2, $3)", [email, hash, fullname]);
            return {
                status: 201,
                message: "Usuário cadastrado com sucesso!"
            };
        } catch (error) {
            return {
                status: 500,
                message: "Erro ao cadastrar usuário. " + error.message
            };
        }
    }

    async getAllUsers() {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query('SELECT fullname, email FROM users');

        let returnJson = {
            users: result.rows
        };

        return returnJson;
    }
}

module.exports = AuthService;