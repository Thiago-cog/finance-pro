const jwt = require('jsonwebtoken');

class AccountsMaintenance {

    constructor(accountsRepository) {
        this.accountsRepository = accountsRepository;
    }

    async decodeToken(token) {
        let result = {}
        try {
            if (!token) {
                result.status = 403
                result.errors = {
                    errors: 'Token não enviado',
                    message: "Token não identificado."
                }
                return result;
            }

            const decoded = jwt.verify(token, process.env.AUTH_SECRET);
            result.status = 200;
            result.data = decoded;
        } catch (error) {
            result.status = 500
            result.errors = {
                errors: error.message,
                message: "Erro inesperado aconteceu!" + error.message
            }
        }
        return result;
    }

    async getAccountsByUserId(userId) {
        let result = {};
        try {
            if (!userId) {
                result.status = 400;
                result.errors = {
                    errors: 'Id não enviado',
                    message: "Id não identificado."
                }
                return result;
            }

            const accountsUser = await this.accountsRepository.getAccountsByUserId(userId);
            result.status = 200;
            result.data = {
                accounts: accountsUser
            }
        } catch (error) {
            result.status = 500
            result.errors = {
                errors: error.message,
                message: "Erro inesperado aconteceu!" + error.message
            }
        }
        return result;
    }

    async getCardByAccountId(accountId) {
        let result = {};
        try {
            if (!accountId) {
                result.status = 400;
                result.errors = {
                    errors: 'Id da conta não enviado',
                    message: "Conta não identificado."
                }
                return result;
            }

            const dataCard = await this.accountsRepository.getCardById(userId);
            result.status = 200;
            result.data = {
                cards: dataCard
            }
        } catch (error) {
            result.status = 500
            result.errors = {
                errors: error.message,
                message: "Erro inesperado aconteceu!" + error.message
            }
        }
        return result;
    }

    async createAccount(accountData) {
        let result = {};
        try {
            if (!accountData || typeof accountData !== 'object' || !accountData.name) {
                result.status = 400;
                result.errors = {
                    errors: 'Dados da conta inválidos',
                    message: "Dados da conta não identificados ou inválidos."
                }
                return result;
            }

            await this.accountsRepository.createAccountByUserId(accountData);
            result.status = 201;
            result.data = {
                message: `Conta ${accountData.name} criada com sucesso!`
            }
        } catch (error) {
            result.status = 500
            result.errors = {
                errors: error.message,
                message: "Erro inesperado aconteceu!" + error.message
            }
        }
        return result;
    }

    async createCard(cardData) {
        let result = {};
        try {
            if (!cardData) {
                result.status = 400;
                result.errors = {
                    errors: 'Dados do cartão não enviados',
                    message: "Dados do cartão não identificados."
                }
                return result;
            }
            await this.accountsRepository.createCardByAccountId(cardData);
            result.status = 201;
            result.data = {
                message: "Cartão de Crédito criado com sucesso!"
            };
        } catch (error) {
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
        try {
            const { accountsId, value, type_movement } = movementExtractData;
            if (Math.sign(value) === -1) {
                result.status = 500;
                result.errors = {
                    error: 'VALOR NEGATIVO',
                    message: 'O valor da movimentação não pode ser negativo'
                };
                return result
            }

            const accountResult = await this.accountsRepository.getAccountById(accountsId);

            if (!accountResult) {
                result.status = 404;
                result.errors = {
                    error: 'Conta não encontrada',
                    message: 'A conta não existe'
                };
                return result;
            }

            const calculateValueResult = this.#calculateValueExtract(accountResult.balance, value, type_movement);

            await this.accountsRepository.createMovementExtract(movementExtractData);
            await this.accountsRepository.updateBalanceByAccountId(accountsId, calculateValueResult.valueFinal);

            result.status = 200;
            result.data = {
                message: 'Movimentação salva com sucesso'
            };
        } catch (error) {
            result.status = 500
            result.errors = {
                errors: error.message,
                message: "Erro inesperado aconteceu!" + error.message
            };
        }
        return result;
    }

    async createMovementInvoice(movementInvoiceData) {
        let result = {};
        try {
            const { cardId, value, type_movement } = movementInvoiceData;
            if (Math.sign(value) === -1) {
                result.status = 500;
                result.errors = {
                    error: 'VALOR NEGATIVO',
                    message: 'O valor da transação não pode ser negativo'
                };
                return result
            }
            const cardResult = await this.accountsRepository.getCardById(cardId);
            const calculateValueResult = this.#calculateValueInvoice(cardResult.value, cardResult.limit_card, value, type_movement);

            await this.accountsRepository.createMovementInvoice(movementInvoiceData);
            await this.accountsRepository.updatValuesCardById(cardId, calculateValueResult.invoiceAmount, calculateValueResult.limitValue);
            
            result.status = 200;
            result.data = {
                message: 'Movimentação salva com sucesso'
            };

        } catch (error) {
            result.status = 500
            result.errors = {
                error: error.message,
                message: "Erro inesperado aconteceu!" + error.message
            };
        }
        return result;
    }

    #calculateValueExtract(value_account = 0, value_movement, type_movement) {
        let returnJson = {
            valueFinal: 0,
            type: ""
        }

        if (type_movement == 1) {
            returnJson.valueFinal = value_account + value_movement;
            returnJson.type = "Receita";
        } else {
            returnJson.valueFinal = value_account - value_movement;
            returnJson.type = "Despesa";
        }

        return returnJson;
    }

    #calculateValueInvoice(valueCard = 0, limitValue, valueMovement, typeMovement) {
        let returnJson = {
            invoiceAmount: 0,
            limitValue: limitValue,
            type: ""
        }

        if (typeMovement == 1) {
            returnJson.invoiceAmount = valueCard - valueMovement;
            returnJson.limitValue = limitValue + valueMovement;
            returnJson.type = "Estorno";
        } else {
            returnJson.invoiceAmount = valueCard + valueMovement;
            returnJson.limitValue = limitValue - valueMovement;
            returnJson.type = "Despesa";
        }

        return returnJson;
    }
}

module.exports = AccountsMaintenance;