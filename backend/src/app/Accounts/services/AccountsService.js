const Database = require('../../../lib/database');
const AccountsError = require("../exceptions/AccountsError");

class AccountsService {
    constructor() {
        this.databaseConnector = new Database();
    }

    async createAccountByUserId(userId, name, typeaccount, balance) {
        const conn = await this.databaseConnector.generateConnection();
        let returnJson = {
            status: null,
            message: null,
        };

        try {
            conn.query(`
                INSERT INTO accounts(user_id, name, type_accounts, balance) VALUES($1, $2, $3, $4)
            `, [userId, name, typeaccount, balance]);
            returnJson.status = true;
            returnJson.message = "Conta cadastrada com sucesso.";
        } catch (error) {
            returnJson.status = false;
            returnJson.message = "Erro ao cadastrar a sua conta.";
        }

        return returnJson;
    }

    async createCardByAccountId(accountsId, numberCard, dueDay, limitCard, value){
        const conn = await this.databaseConnector.generateConnection();
        let returnJson = {
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
                    INSERT INTO cards(accounts_id, number_card, due_day, limit_card) VALUES($1, $2, $3, $4)
                `, [accountsId, numberCard, dueDay, limitCard]);
            }

            returnJson.status = true;
            returnJson.message = "Cartão cadastrado com sucesso.";
        }catch(error){
            returnJson.status = false;
            returnJson.message = "Erro ao cadastrar a seu cartão. " + error.message;    
        }

        return returnJson;
    }

    async createMovementExtract(accountsId, value, type_movement, date_movement, month, year) {
        const conn = await this.databaseConnector.generateConnection();
        
        let returnJson = {
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

            returnJson.status = true;
            returnJson.message = calculateValueResult.type + " lançada com sucesso";
        }catch(error){
            returnJson.status = false;
            returnJson.message = "Ocorreu um erro inesperado. "  + error.message;
        }

        return returnJson;
    }

    async createMovementInvoice(cardId, value, type_movement, date_movement, month, year) {
        const conn = await this.databaseConnector.generateConnection();
        let type = '';
        let returnJson = {
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

            returnJson.status = true;
            returnJson.message = type + " lançado com sucesso";
        }catch(error){
            returnJson.status = false;
            returnJson.message = "Ocorreu um erro inesperado. " + error.message;
        }

        return returnJson;
    }

    async getAccountsByUserId (userId) {
        const conn = await this.databaseConnector.generateConnection();
        let returnJson = {
            status: null,
            message: null,
            accounts: null
        };

        try{
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
            
            returnJson.status = true;
            returnJson.message = "sucesso";
            returnJson.accounts = result.rows;
        }catch(error){
            returnJson.status = false;
            returnJson.message = "Ocorreu um erro inesperado. " + error.message;
        }
        
        return returnJson;
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