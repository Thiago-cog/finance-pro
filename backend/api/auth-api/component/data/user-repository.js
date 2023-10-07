const Database = require("./connectors/database.js");

class UserRepository {
    constructor() {
        this.databaseConnector = new Database();
    }

    async getUserByEmail(email) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }

    async createUser(email, hash, fullname){
        const conn = await this.databaseConnector.generateConnection();
        conn.query("INSERT INTO users(id, email, password, fullname) VALUES(nextval('seq_users_id'), $1, $2, $3)", [email, hash, fullname]);
    }
}

module.exports = UserRepository;