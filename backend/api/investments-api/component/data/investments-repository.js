const Database = require("./connectors/database.js");

class InvestmentsRepository {

    constructor() {
        this.databaseConnector = new Database();
    }

    async insertQuoteInWallet(quoteData) {
        const conn = await this.databaseConnector.generateConnection();
        const { walletId, typeInvestments, stock, quantity, quote_value } = quoteData;
        await conn.query(`
            INSERT INTO investments(wallet_id, type_investments, stock, quantity, quote_value) VALUES($1, $2, $3, $4, $5)
        `, [walletId, typeInvestments, stock, quantity, quote_value]);
    }
}

module.exports = InvestmentsRepository;