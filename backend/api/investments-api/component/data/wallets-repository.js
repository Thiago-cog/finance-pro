const Database = require("./connectors/database.js");

class WalletsRepository {

    constructor() {
        this.databaseConnector = new Database();
    }

    async createWallet(walletData) {
        const conn = await this.databaseConnector.generateConnection();
        const { userId, name } = walletData;
        await conn.query(`
            INSERT INTO wallets(user_id, name) VALUES($1, $2)
        `, [userId, name]);
    }

    async getAllWalletsByUserId(userId) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query(`SELECT id, name FROM wallets WHERE user_id = $1`, [userId]);
        return result.rows;
    }

    async getWalletByUserId(userId) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query(`SELECT true as isHaveWallet FROM wallets WHERE user_id = $1`, [userId]);
        return result.rows;
    }
}

module.exports = WalletsRepository;