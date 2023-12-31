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

    async getAccountById(accountId) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query(`SELECT * FROM accounts WHERE id = $1`, [accountId]);
        return result.rows[0];
    }

    async getCardById(cardId) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query(`SELECT * FROM cards WHERE id = $1`, [cardId]);
        return result.rows[0];
    }

    async getAllStatusByUserId(userId) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query(`SELECT a.id,
                                                a.balance AS balance,
                                                c.value AS expense
                                        FROM users u
                                        LEFT JOIN accounts a ON u.id = a.user_id
                                        LEFT JOIN cards c ON a.id = c.accounts_id
                                        WHERE u.id = $1
                                        ORDER BY a.id`, [userId]);
        return result.rows;
    }

    async getCategories() {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query(`SELECT * FROM categories`);
        return result.rows;
    }

    async getAllCardsByUserId(userId) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query(`SELECT c.id,
                                                c.number_card,
                                                c.value,
                                                ROUND((c.limit_card - c.value)::numeric, 2) AS limit_available,
                                                u.fullname,
                                                a.name
                                        FROM cards c
                                        INNER JOIN accounts a ON c.accounts_id = a.id
                                        INNER JOIN users u ON a.user_id = u.id
                                        WHERE u.id = $1;`, [userId]);
        return result.rows;
    }

    async getAllMovimentsByUserId(userId) {
        const conn = await this.databaseConnector.generateConnection();  
        const resultExtract = await conn.query(`SELECT
                                                    a.name,
                                                    e.id,
                                                    e.value,
                                                    c.name_category,
                                                    CASE
                                                        WHEN e.type_movement = 1 THEN 'Receita'
                                                        ELSE 'Despesa'
                                                    END AS type_movement,
                                                    TO_CHAR(e.date_movement, 'DD/MM/YYYY') AS data_format,
                                                    e.month
                                                FROM
                                                    extracts e
                                                INNER JOIN accounts a ON
                                                    e.account_id = a.id
                                                INNER JOIN categories c ON
                                                    e.category_id = c.id
                                                WHERE
                                                    a.user_id = $1;`, [userId]);

        const resultInvoice = await conn.query(`SELECT
                                                    a.name,
                                                    i.id,
                                                    i.value,
                                                    ct.name_category,
                                                    CASE
                                                        WHEN i.type_movement = 1 THEN 'Receita'
                                                        ELSE 'Despesa'
                                                    END AS type_movement,
                                                    TO_CHAR(i.date_movement, 'DD/MM/YYYY') AS data_format,
                                                    i.month
                                                FROM
                                                    invoices i
                                                INNER JOIN cards c ON
                                                    i.card_id = c.id
                                                INNER JOIN accounts a ON
                                                    c.accounts_id = a.id
                                                INNER JOIN categories ct ON
                                                    i.category_id = ct.id
                                                WHERE
                                                    a.user_id = $1;`, [userId]);
        return {extracts: resultExtract.rows, invoices: resultInvoice.rows};
    }

    async createMovementExtract(movementExtractData) {
        const conn = await this.databaseConnector.generateConnection();
        await conn.query(`
            INSERT INTO extracts(account_id, value, type_movement, date_movement, month, year, category_id) VALUES($1, $2, $3, $4, $5, $6, $7)`,
            [movementExtractData.accountsId, movementExtractData.value, movementExtractData.type_movement, movementExtractData.date_movement, movementExtractData.month, movementExtractData.year, movementExtractData.category_id]);
    }

    async createMovementInvoice(movementInvoiceData) {
        const conn = await this.databaseConnector.generateConnection();
        await conn.query(`
            INSERT INTO invoices(card_id, value, type_movement, date_movement, month, year, category_id) VALUES($1, $2, $3, $4, $5, $6, $7)`,
            [movementInvoiceData.cardId, movementInvoiceData.value, movementInvoiceData.type_movement, movementInvoiceData.date_movement, movementInvoiceData.month, movementInvoiceData.year, movementInvoiceData.category_id]);
    }

    async updateBalanceByAccountId(accountId, valueFinal) {
        const conn = await this.databaseConnector.generateConnection();
        await conn.query(`UPDATE accounts SET balance = $1 WHERE id = $2`, [valueFinal, accountId]);
    }

    async updatValuesCardById(cardId, invoiceAmount, limitValue) {
        const conn = await this.databaseConnector.generateConnection();
        await conn.query(`UPDATE cards SET limit_card = $1, value = $2 WHERE id = $3`, [limitValue, invoiceAmount, cardId]);
    }
}

module.exports = AccountsRepository;