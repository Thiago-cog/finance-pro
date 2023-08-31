const Database = require('../../../lib/database');
const AccountsError = require("../exceptions/AccountsError");

class AccountsService {
    constructor() {
        this.databaseConnector = new Database();
    }

    async createAccountByUserId(userId, name, typeaccount, balance) {
        const conn = await this.databaseConnector.generateConnection();
        try {
            conn.query(`
                INSERT INTO accounts(id, user_id, name, typeaccounts, balance) VALUES(nextval('seq_accounts_id'), $1, $2, $3, $4)
            `, [userId, name, typeaccount, balance]);
        } catch (error) {
            const retornoJson = {
                status: false,
                message: "Erro ao cadastrar a sua conta.",
            };
            return retornoJson;
        }
        const retornoJson = {
            status: true,
            message: "Conta cadastrada com sucesso.",
        };
        return retornoJson;
    }
}

module.exports = AccountsService;