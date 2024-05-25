const Database = require("./connectors/database.js");

class InvestmentsRepository {

    constructor() {
        this.databaseConnector = new Database();
    }

    async insertQuoteInWallet(quoteData) {
        const conn = await this.databaseConnector.generateConnection();
        const { walletId, typeInvestments, stock, quantity, quoteValue } = quoteData;
        await conn.query(`
            INSERT INTO investments(wallet_id, type_investments, stock, quantity, quote_value) VALUES($1, $2, $3, $4, $5)
        `, [walletId, typeInvestments, stock, quantity, quoteValue]);
    }

    async getAllWalletData(userId) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query(`SELECT
                                            ti.name_type,
                                            i.stock,
                                            SUM(i.quantity) AS total_quantity,
                                            SUM(i.quote_value) AS total_value
                                        FROM
                                            investments i
                                        INNER JOIN type_investments ti ON
                                            i.type_investments = ti.id
                                        INNER JOIN wallets w ON
                                            i.wallet_id = w.id
                                        INNER JOIN users u ON
                                            w.user_id = u.id
                                        WHERE
                                            u.id = $1
                                        GROUP BY 
                                            ti.name_type,
                                            i.stock;`, [userId]);
        return result.rows;
    }

    async getStocksByUserId(userId) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query(`SELECT
                                            i.stock,
                                            ti.name_type,
                                            SUM(i.quantity) AS total_quantity,
                                            SUM(i.quote_value) AS total_value
                                        FROM
                                            investments i
                                        INNER JOIN type_investments ti ON
                                            i.type_investments = ti.id
                                        INNER JOIN wallets w ON
                                            i.wallet_id = w.id
                                        INNER JOIN users u ON
                                            w.user_id = u.id
                                        WHERE
                                            u.id = $1
                                        GROUP BY 
                                            i.stock,
                                            ti.name_type;`, [userId]);
        return result.rows;
    }
}

module.exports = InvestmentsRepository;