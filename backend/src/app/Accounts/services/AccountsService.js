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
            retornoJson.message = "Erro ao cadastrar a seu cartão. " + error.message;    
        }

        return retornoJson;
    }

    async createRevenueExtract(accountsId, value, type_movement, date_movement, month, year) {
        const conn = await this.databaseConnector.generateConnection();
        let retornoJson = {
            status: null,
            message: null,
        };

        try{
            if(!Math.sign(value)){
                throw new Error("O valor da receita não pode ser negativo");
            }

            conn.query(`
            INSERT INTO extract(account_id, value, type_movement, date_movement, month, year) VALUES($1, $2, $3, $4, $5, $6)`,
            [accountsId, value, type_movement, date_movement, month, year]);

            const accountResult = conn.query(`SELECT value FROM accounts WHERE id = $1`, [accountsId]);
            const valueFinal = accountResult.rows[0].value + value;

            conn.query(`UPDATE accounts SET value = $1`, [valueFinal]);

            retornoJson.status = true;
            retornoJson.message = "Receita lançada com sucesso"
        }catch(error){
            retornoJson.status = false;
            retornoJson.message = "Erro ao lançar a receita. " + error.message;
        }
    }
}

module.exports = AccountsService;