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
        
        return result.rows;
    }

    async createAccountByUserId(accountData) {
        const conn = await this.databaseConnector.generateConnection();
        const { userId, name, typeaccount, balance } = accountData;
        conn.query(`
            INSERT INTO accounts(user_id, name, type_accounts, balance) VALUES($1, $2, $3, $4)
        `, [userId, name, typeaccount, balance]);
    }

    async createCardByAccountId(cardData) {
        const conn = await this.databaseConnector.generateConnection();
        const { accountsId, numberCard, dueDay, limitCard } = cardData;
        let value = 0;

        if(cardData.value){
            value = cardData.value;
        }
        conn.query(`
            INSERT INTO cards(accounts_id, number_card, due_day, limit_card, value) VALUES($1, $2, $3, $4, $5)
        `, [accountsId, numberCard, dueDay, limitCard, value]);
    }
}

module.exports = AccountsRepository;