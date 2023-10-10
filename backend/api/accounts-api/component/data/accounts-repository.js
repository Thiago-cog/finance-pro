const Database = require("./connectors/database.js");

class AccountsRepository {
    constructor() {
        this.databaseConnector = new Database();
    }

    async getAccountsByUserId(userId) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query(` 
            SELECT id,
                   user_id,
                   name,
                   CASE
                       WHEN type_accounts = 1 THEN 'Conta Corrente'
                       ELSE 'Conta Poupança'
                   END AS type_account,
                   balance
            FROM accounts
            WHERE user_id = $1`, [userId]);
    }
}

module.exports = AccountsRepository;