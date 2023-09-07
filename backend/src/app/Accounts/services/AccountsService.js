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
                INSERT INTO accounts(user_id, name, type_accounts, balance) VALUES($1, $2, $3, $4)
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

    async createMovementExtract(accountsId, value, type_movement, date_movement, month, year) {
        const conn = await this.databaseConnector.generateConnection();
        
        let retornoJson = {
            status: null,
            message: null,
        };
        
        try{
            const accountResult = await conn.query(`SELECT balance FROM accounts WHERE id = $1`, [accountsId]);
            const calculateValueResult = this.#calculateValueExtract(accountResult.rows[0].balance, value, type_movement);

            if(!Math.sign(value)){
                throw new Error("O valor da " + calculateValueResult.type + " não pode ser negativo");
            }

            await conn.query(`
            INSERT INTO extracts(account_id, value, type_movement, date_movement, month, year) VALUES($1, $2, $3, $4, $5, $6)`,
            [accountsId, value, type_movement, date_movement, month, year]);

            await conn.query(`UPDATE accounts SET balance = $1`, [calculateValueResult.valueFinal]);

            retornoJson.status = true;
            retornoJson.message = calculateValueResult.type + " lançada com sucesso";
        }catch(error){
            retornoJson.status = false;
            retornoJson.message = "Ocorreu um erro inesperado. "  + error.message;
        }

        return retornoJson;
    }

    async createMovementInvoice(cardId, value, type_movement, date_movement, month, year) {
        const conn = await this.databaseConnector.generateConnection();
        let type = '';
        let retornoJson = {
            status: null,
            message: null,
        };

        if(type_movement == 1){
            type = "Estorno";
        }else{
            type = "Despesa";
        }

        try{
            if(!Math.sign(value)){
                throw new Error("O valor da " + type + " não pode ser negativo");
            }

            await conn.query(`
            INSERT INTO invoices(card_id, value, type_movement, date_movement, month, year) VALUES($1, $2, $3, $4, $5, $6)`,
            [cardId, value, type_movement, date_movement, month, year]);

            retornoJson.status = true;
            retornoJson.message = type + " lançado com sucesso";
        }catch(error){
            retornoJson.status = false;
            retornoJson.message = "Ocorreu um erro inesperado. " + error.message;
        }

        return retornoJson;
    }


    #calculateValueExtract(value_account = 0, value_movement, type_movement){
        let returnJson = {
            valueFinal: 0,
            type: ""
        }
        
        if(type_movement == 1){
            returnJson.valueFinal = value_account + value_movement;
            returnJson.type = "Receita";
        }else{
            returnJson.valueFinal = value_account - value_movement;
            returnJson.type = "Despesa";
        }

        return returnJson;
    }
}

module.exports = AccountsService;