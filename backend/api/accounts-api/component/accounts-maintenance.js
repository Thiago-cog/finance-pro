const bcrypt =  require('bcrypt');
const jwt =  require('jsonwebtoken');

class AccountsMaintenance {

    constructor(accountsRepository) {
        this.accountsRepository = accountsRepository;
    }

    async decodeToken(token) {
        let result = {}
        try{
            const decoded = jwt.verify(token, process.env.AUTH_SECRET);
            result.status = 200;
            result.data = decoded;
        }catch(error){
            result.status = 500
            result.errors = {
                errors: error,
                message: "Erro inesperado aconteceu!" + error.message 
            }
        }
        return result;
    }

    async getAccountsByUserId(userId) {
        let result = {};
        try{
            const accountsUser = this.accountsRepository.getAccountsByUserId(userId);
            result.status = 200;
            result.data = {
                accounts: accountsUser
            }
        }catch(error){
            result.status = 500
            result.errors = {
                errors: error,
                message: "Erro inesperado aconteceu!" + error.message 
            }
        }
        return result;
    }

    async createAccount(accountData) {
        let result = {};
        try{
            this.accountsRepository.createAccountByUserId(accountData);
            result.status = 201;
            result.data = {
                message: "Conta " + accountData.name + " criada com sucesso!"
            }
        }catch(error){
            result.status = 500
            result.errors = {
                errors: error,
                message: "Erro inesperado aconteceu!" + error.message 
            }
        }
        return result;
    }

    async createCard(cardData) {
        let result = {};
        try{
            await this.accountsRepository.createCardByAccountId(cardData);
            result.status = 201;
            result.data = {
                message: "Cartão de Crédito criado com sucesso!"
            };
        }catch(error){
            result.status = 500
            result.errors = {
                errors: error,
                message: "Erro inesperado aconteceu!" + error.message 
            };
        }
        return result;
    }

    async createMovementExtract(movementData) {
        let result = {};
        try{
            const { accountsId, value, type_movement } = movementData;    
            if(!Math.sign(value)){
                result.status = 500;
                result.errors = {
                    errors: 'VALOR NEGATIVO',
                    message: 'O valor da ' + calculateValueResult.type + ' não pode ser negativo'
                };
                return result
            }

            const accountResult = await this.accountsRepository.getBalanceByAccountId(accountsId);
            const calculateValueResult = this.#calculateValueExtract(accountResult.balance, value, type_movement);

            await this.accountsRepository.createMovementExtract(movementData);
            await this.accountsRepository.updateBalanceByAccountId(accountsId, calculateValueResult.valueFinal);

            result.status = 200;
            result.data = {
                message: 'Movimentação salva com sucesso'
            };

            return result;
        }catch(error){
            result.status = 500
            result.errors = {
                errors: error,
                message: "Erro inesperado aconteceu!" + error.message 
            };
        }
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

module.exports = AccountsMaintenance;