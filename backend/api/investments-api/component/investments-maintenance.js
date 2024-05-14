const jwt = require('jsonwebtoken');
const TypeInvestments = require('./entity/type-investments');

class InvestmentsMaintenance {
    constructor(walletsRepository, investmentsRepository) {
        this.walletsRepository = walletsRepository;
        this.investmentsRepository = investmentsRepository;
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

    async createWallet(walletData) {
        let result = {};
        try {
            if (!walletData.userId) {
                result.status = 400;
                result.errors = {
                    errors: 'Id não enviado',
                    message: "Id não identificado."
                }
                return result;
            }

            await this.walletsRepository.createWallet(walletData);

            result.status = 200;
            result.data = {
                message: `Carteira: ${walletData.name} criada com sucesso.`
            };
        } catch(error) {
            result.status = 500
            result.errors = {
                errors: error.message,
                message: "Erro inesperado aconteceu!" + error.message
            }
        }

        return result;
    }

    async addQuoteInWallet(quoteData) {
        let result = {};
        try {
            if (!quoteData.walletId) {
                result.status = 400;
                result.errors = {
                    errors: 'Carteira não encontrada',
                    message: "Não foi possível identificar a carteira."
                }
                return result;
            }
            
            await this.investmentsRepository.insertQuoteInWallet(quoteData);
            
            const typeInvestmentsName = this.#getTypeInvestments(quoteData.typeInvestments);
            result.status = 200;
            result.data = {
                message: `${typeInvestmentsName}: ${quoteData.stock} adicionada(o) a carteira com sucesso.`
            };

        } catch(error) {
            result.status = 500
            result.errors = {
                errors: error.message,
                message: "Erro inesperado aconteceu!" + error.message
            }
        }

        return result;
    }

    #getTypeInvestments(typeInvestmentsId) {
        const typeInvestmentsName = {
            [TypeInvestments.ACTION]: 'Ação',
            [TypeInvestments.FIIS]: 'Fundo Imobiliário',
            [TypeInvestments.BRD]: 'BRD',
            [TypeInvestments.CRYPTO]: 'Criptomoeda',
        }
        return typeInvestmentsName[typeInvestmentsId] || '';
    }
}

module.exports = InvestmentsMaintenance;