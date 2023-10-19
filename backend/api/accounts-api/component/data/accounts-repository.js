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
        await conn.query(`
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
        await conn.query(`
            INSERT INTO cards(accounts_id, number_card, due_day, limit_card, value) VALUES($1, $2, $3, $4, $5)
        `, [accountsId, numberCard, dueDay, limitCard, value]);
    }

    async getBalanceByAccountId(accountId) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query(`SELECT balance FROM accounts WHERE id = $1`, [accountId]);
        return result.rows[0];
    }

    async createMovementExtract(movementData) {
        const conn = await this.databaseConnector.generateConnection();
        await conn.query(`
            INSERT INTO extracts(account_id, value, type_movement, date_movement, month, year) VALUES($1, $2, $3, $4, $5, $6)`,
            [movementData.accountsId, movementData.value, movementData.type_movement, movementData.date_movement, movementData.month, movementData.year]);
    }

    async updateBalanceByAccountId(accountId, valueFinal) {
        const conn = await this.databaseConnector.generateConnection();
        await conn.query(`UPDATE accounts SET balance = $1 WHERE id = $2`, [valueFinal, accountId]);
    }
}

module.exports = AccountsRepository;