const Database = require("./connectors/database.js");

class WalletsRepository {

    constructor() {
        this.databaseConnector = new Database();
    }

    async createWallet(walletData) {
        const conn = await this.databaseConnector.generateConnection();
        const { userId, name, totalvalue } = walletData;
        await conn.query(`
            INSERT INTO wallets(user_id, name, total_value) VALUES($1, $2, $3)
        `, [userId, name, totalvalue]);
    }
}

module.exports = WalletsRepository;