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

    async createMovementExtract(movementExtractData) {
        let result = {};
        try{
            const { accountsId, value, type_movement } = movementExtractData;    
            if(!Math.sign(value)){
                result.status = 500;
                result.errors = {
                    errors: 'VALOR NEGATIVO',
                    message: 'O valor da movimentação não pode ser negativo'
                };
                return result
            }

            const accountResult = await this.accountsRepository.getAccountById(accountsId);
            const calculateValueResult = this.#calculateValueExtract(accountResult.balance, value, type_movement);

            await this.accountsRepository.createMovementExtract(movementExtractData);
            await this.accountsRepository.updateBalanceByAccountId(accountsId, calculateValueResult.valueFinal);

            result.status = 200;
            result.data = {
                message: 'Movimentação salva com sucesso'
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

    async createMovementInvoice(movementInvoiceData) {
        let result = {};
        try{
            const { cardId, value, type_movement } = movementInvoiceData;   
            if(!Math.sign(value)){
                result.status = 500;
                result.errors = {
                    errors: 'VALOR NEGATIVO',
                    message: 'O valor da transação não pode ser negativo'
                };
                return result
            }
            const cardResult = await this.accountsRepository.getCardById(cardId);
            const calculateValueResult = this.#calculateValueInvoice(cardResult.value, cardResult.limit_card, value, type_movement);

            await this.accountsRepository.createMovementInvoice(movementExtractData);
            await this.accountsRepository.updatValuesCardById(cardId, calculateValueResult.invoiceAmount, calculateValueResult.limitValue);
        }catch(error){
            result.status = 500
            result.errors = {
                errors: error,
                message: "Erro inesperado aconteceu!" + error.message 
            };
        }
        return result;
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

    #calculateValueInvoice(valueCard = 0, limitValue, valueMovement, typeMovement){
        let returnJson = {
            invoiceAmount: 0,
            limitValue: limitValue,
            type: ""
        }
        
        if(typeMovement == 1){
            returnJson.invoiceAmount = valueCard - valueMovement;
            returnJson.limitValue = limitValue + valueMovement;
            returnJson.type = "Estorno";
        }else{
            returnJson.invoiceAmount = valueCard + valueMovement;
            returnJson.limitValue = limitValue - valueMovement;
            returnJson.type = "Despesa";
        }

        return returnJson;
    }
}

module.exports = AccountsMaintenance;