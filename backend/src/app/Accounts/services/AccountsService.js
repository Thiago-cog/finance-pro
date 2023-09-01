const Database = require('../../../lib/database');
const AccountsError = require("../exceptions/AccountsError");

class AccountsService {
    constructor() {
        this.databaseConnector = new Database();
    }

    async createAccountByUserId(userId, name, typeaccount, balance) {
        const conn = await this.databaseConnector.generateConnection();
        let retornoJson = {
            status: null,
            message: null,
        };

        try {
            conn.query(`
                INSERT INTO accounts(id, user_id, name, typeaccounts, balance) VALUES(nextval('seq_accounts_id'), $1, $2, $3, $4)
            `, [userId, name, typeaccount, balance]);
            retornoJson.status = true;
            retornoJson.message = "Conta cadastrada com sucesso.";
        } catch (error) {
            retornoJson.status = false;
            retornoJson.message = "Erro ao cadastrar a sua conta.";
        }

        return retornoJson;
    }

    async createCardByAccountId(accountsId, numberCard, dueDay, limitCard, value){
        const conn = await this.databaseConnector.generateConnection();
        let retornoJson = {
            status: null,
            message: null,
        };

        try{
            if(value > 0){
                conn.query(`
                    INSERT INTO cards(accounts_id, number_card, due_day, limit_card, value) VALUES($1, $2, $3, $4, $5)
                `, [accountsId, numberCard, dueDay, limitCard, value]);
            }else{
                conn.query(`
                    INSERT INTO cards(accounts_id, number_card, due_day, limit_card, value) VALUES($1, $2, $3, $4)
                `, [accountsId, numberCard, dueDay, limitCard]);
            }

            retornoJson.status = true;
            retornoJson.message = "Cartão cadastrado com sucesso.";
        }catch(error){
            retornoJson.status = false;
            retornoJson.message = "Erro ao cadastrar a seu cartão.";    
        }

        return retornoJson;
    }
}

module.exports = AccountsService;