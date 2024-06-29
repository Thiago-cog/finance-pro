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

            accountsUser.forEach(function (account, indice) {
                const balanceSplit = String(account.balance).split('.');
                if (balanceSplit.length == 1) {
                    accountsUser[indice].balance = accountsUser[indice].balance + '00';
                } else {
                    if (balanceSplit[1].length == 1) {
                        accountsUser[indice].balance = accountsUser[indice].balance + '0';
                    }
                }
                accountsUser[indice].balance = String(accountsUser[indice].balance).replace(/\D/g, "").replace(/(\d)(\d{2})$/g, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g, ".");
            });

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

    async getAllCardsByUserId(userId) {
        let result = {};
        try {
            if (!userId) {
                result.status = 400;
                result.errors = {
                    errors: 'Id do usuário não enviado',
                    message: "Usuário não identificado."
                }
                return result;
            }

            const dataCard = await this.accountsRepository.getAllCardsByUserId(userId);
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

    async getAllStatusByUserId(userId) {
        let result = {};

        try {
            if (!userId) {
                result.status = 400;
                result.errors = {
                    errors: 'Id do usuário não enviado',
                    message: "Usuário não identificado."
                }
                return result;
            }

            const allStatusData = await this.accountsRepository.getAllStatusByUserId(userId);
            let accountId = 0;
            let returnStatusData = {};
            returnStatusData.balanceTotal = 0;
            returnStatusData.expenseTotal = 0;

            allStatusData.forEach(statusData => {
                if (accountId != statusData.id && accountId != 0) {
                    returnStatusData.balanceTotal += statusData.balance;
                    returnStatusData.expenseTotal += statusData.expense;
                    returnStatusData.expenseTotal += statusData.expense_invoice;
                } else {
                    returnStatusData.balanceTotal = statusData.balance;
                    returnStatusData.expenseTotal = statusData.expense;
                    returnStatusData.expenseTotal = statusData.expense_invoice;
                }
                accountId = statusData.id;
            });

            const grossProfit = returnStatusData.balanceTotal - returnStatusData.expenseTotal;
            let profitMargin = grossProfit / returnStatusData.balanceTotal;

            let balance = returnStatusData.balanceTotal;
            let expense = returnStatusData.expenseTotal;
            const balanceSplit = String(balance).split('.');
            const expenseSplit = String(expense).split('.');

            if (balanceSplit.length == 1) {
                balance = balance + '00';
            } else {
                if (balanceSplit[1].length == 1) {
                    balance = balance + '0';
                }
            }

            if (expenseSplit.length == 1) {
                expense = expense + '00';
            } else {
                if (expenseSplit[1].length == 1) {
                    expense = expense + '0';
                }
            }

            if (returnStatusData.balanceTotal === 0 && returnStatusData.expenseTotal === 0) {
                profitMargin = 0;
            }

            returnStatusData.balanceTotal = String(balance).replace(/\D/g, "").replace(/(\d)(\d{2})$/g, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g, ".");
            returnStatusData.expenseTotal = String(expense).replace(/\D/g, "").replace(/(\d)(\d{2})$/g, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g, ".");
            returnStatusData.profitMargin = String((profitMargin * 100).toFixed(2)).replace(".", ",");

            result.status = 200;
            result.data = {
                allStatusData: returnStatusData
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

    async getcategories() {
        let result = {};
        try {
            const categoriesResult = await this.accountsRepository.getCategories();
            result.status = 200;
            result.data = {
                categories: categoriesResult
            }
        } catch (error) {
            result.status = 500
            result.errors = {
                error: error.message,
                message: "Erro inesperado aconteceu!" + error.message
            };
        }
        return result;
    }

    async getAllMovimentsByUserId(userId) {
        let result = {};
        try {
            if (!userId) {
                result.status = 400;
                result.errors = {
                    errors: 'Id do usuário não enviado',
                    message: "Usuário não identificado."
                }
                return result;
            }

            const allMoviments = await this.accountsRepository.getAllMovimentsByUserId(userId);
            let moviments = allMoviments.extracts.concat(allMoviments.invoices);

            moviments.forEach((moviment, index) => {
                const valueSplit = String(moviment.value).split('.');
                if (valueSplit.length == 1) {
                    moviments[index].value = moviments[index].value + '00';
                } else {
                    if (valueSplit[1].length == 1) {
                        moviments[index].value = moviments[index].value + '0';
                    }
                }
                moviments[index].value = String(moviments[index].value).replace(/\D/g, "").replace(/(\d)(\d{2})$/g, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g, ".");
            })

            result.status = 200;
            result.data = { moviments: moviments };
        } catch (error) {
            result.status = 500
            result.errors = {
                errors: error.message,
                message: "Erro inesperado aconteceu!" + error.message
            }
        }
        return result;
    }

    async getTotalRevenueByUserId(userId) {
        let result = {};
        try {
            if (!userId) {
                result.status = 400;
                result.errors = {
                    errors: 'Id do usuário não enviado',
                    message: "Usuário não identificado."
                }
                return result;
            }

            const resultTotalRevenue = await this.accountsRepository.getTotalRevenueByUserId(userId);

            result.status = 200;
            result.data = { revenues: resultTotalRevenue };
        } catch (error) {
            result.status = 500
            result.errors = {
                errors: error.message,
                message: "Erro inesperado aconteceu!" + error.message
            }
        }

        return result;
    }

    async getTotalExpensesByUserId(userId) {
        let result = {};
        try {
            if (!userId) {
                result.status = 400;
                result.errors = {
                    errors: 'Id do usuário não enviado',
                    message: "Usuário não identificado."
                }
                return result;
            }

            const resultTotalExpenses = await this.accountsRepository.getTotalExpensesByUserId(userId);

            result.status = 200;
            result.data = { expenses: resultTotalExpenses };
        } catch (error) {
            result.status = 500
            result.errors = {
                errors: error.message,
                message: "Erro inesperado aconteceu!" + error.message
            }
        }

        return result;
    }

    async getRevenueAndExpensesByUserId(userId) {
        let result = {};
        try {
            if (!userId) {
                result.status = 400;
                result.errors = {
                    errors: 'Id do usuário não enviado',
                    message: "Usuário não identificado."
                }
                return result;
            }

            const resultRevenueAndExpenseByExtracts = await this.accountsRepository.getRevenueAndExpenseByExtractsByUserId(userId);
            const resultExpensesByInvoices = await this.accountsRepository.getExpenseByInvoicesByUserId(userId);

            let mergedArray = [...resultRevenueAndExpenseByExtracts];

            resultExpensesByInvoices.forEach(item2 => {
                const found = mergedArray.find(item1 => item1.year === item2.year && item1.month === item2.month);

                if (found) {
                    found.total_value_expense += item2.total_value_expense;
                } else {
                    mergedArray.push({ ...item2 });
                }
            });

            result.status = 200;
            result.data = {
                mergedArray
            };

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

    async deleteTransaction(transactionId) {
        let result = {};
        try {

            if(!transactionId) {
                result.status = 400;
                result.errors = {
                    error: 'ID NÃO ENCONTRADO',
                    message: 'O id da transação não informado.'
                };
                return result
            }

            await this.accountsRepository.deleteTransactionById(transactionId);

            result.status = 200;
            result.data = {
                message: 'Transação deletada com sucesso'
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
    
    async deleteAccount(accountId) {
        let result = {};
        try {

            if(!accountId) {
                result.status = 400;
                result.errors = {
                    error: 'ID NÃO ENCONTRADO',
                    message: 'O id da conta não informado.'
                };
                return result
            }

            await this.accountsRepository.deleteAccountById(accountId);

            result.status = 200;
            result.data = {
                message: 'Conta deletada com sucesso'
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
    
    async deleteCard(cardId) {
        let result = {};
        try {

            if(!cardId) {
                result.status = 400;
                result.errors = {
                    error: 'ID NÃO ENCONTRADO',
                    message: 'O id do cartão não informado.'
                };
                return result
            }

            await this.accountsRepository.deleteCardById(cardId);

            result.status = 200;
            result.data = {
                message: 'Cartão deletado com sucesso'
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