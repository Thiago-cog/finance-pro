const Database = require('../../../lib/database');
const UsersError = require("../exceptions/UsersError");

class AuthService {
    constructor() {
        this.databaseConnector = new Database();
    }

    async createUser(email, password, fullname) {
        const conn = await this.databaseConnector.generateConnection();

        try {
            conn.query("INSERT INTO users(id, email, password, fullname) VALUES(nextval('seq_users_id'), $1, $2, $3)", [email, password, fullname]);
            return true;
        } catch (error) {
            throw new UsersError('Erro ao criar usuário');
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