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
            this.accountsRepository.createCardByAccountId(cardData);
            result.status = 201;
            result.data = {
                message: "Cartão de Crédito criado com sucesso!"
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

    async createMovementExtract() {
        let result = {};
        try{

        }catch(error){
            
        }
    }
}

module.exports = AccountsMaintenance;