const AccountsMaintenance = require('../accounts-maintenance');
const dotenv = require('dotenv');
dotenv.config();

const accountsRepositoryMock = () => {
    class AccountsRepository {
        getAccountsByUserId(userId) { }
        createAccountByUserId(accountData) { }
        createCardByAccountId(cardData) { }
        getAccountById(accountId) { }
        getCardById(cardId) { }
        createMovementExtract(movementExtractData) { }
        createMovementInvoice(movementInvoiceData) { }
        updateBalanceByAccountId(accountId, valueFinal) { }
        updatValuesCardById(cardId, invoiceAmount, limitValue) { }
    }
    return new AccountsRepository()
}

const accountsRepository = accountsRepositoryMock();

describe('Função decodeToken', () => {
    test('Funcionamento correto da função', async () => {
        const accountsMaintenance = new AccountsMaintenance(accountsRepository);
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVG9rZW4iOnsiaWQiOiIxIiwiZnVsbG5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtQGdtYWlsLmNvbSJ9LCJpYXQiOjE2OTc5MTU5NTcsImV4cCI6MTY5ODUyMDc1N30.W9dWILGtqZk34a_xzrUhkTRe8XrBfmWH_GIqIIXRi9c';
        const result = await accountsMaintenance.decodeToken(token);

        expect(result).toStrictEqual(
            {
                "data": {
                    "exp": 1698520757,
                    "iat": 1697915957,
                    "userToken":
                    {
                        "email": "adm@gmail.com",
                        "fullname": "Admin",
                        "id": "1"
                    }
                }, "status": 200
            });
    });

    test('Funcionamento da função passando o token errado', async () => {
        const accountsMaintenance = new AccountsMaintenance(accountsRepository);
        const token = 'token';
        const result = await accountsMaintenance.decodeToken(token);
        expect(result).toStrictEqual({ "errors": { "errors": "jwt malformed", "message": "Erro inesperado aconteceu!jwt malformed" }, "status": 500 });
    });

    test('Funcionamento da função sem passar o token', async () => {
        const accountsMaintenance = new AccountsMaintenance(accountsRepository);
        const result = await accountsMaintenance.decodeToken();
        expect(result).toStrictEqual({ "errors": { "errors": "Token não enviado", "message": "Token não identificado." }, "status": 403 });
    });
});

describe('Função getAccountsByUserId', () => {
    test('Teste do funcionamento correto da função', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.getAccountsByUserId = jest.fn().mockReturnValue([{ id: 1, name: 'Account 1' }, { id: 2, name: 'Account 2' }]);
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const result = await accountsMaintenance.getAccountsByUserId(1);
        expect(result).toEqual({ status: 200, data: { accounts: [{ id: 1, name: 'Account 1' }, { id: 2, name: 'Account 2' }] } });
    });

    test('Teste do funcionamento da função sem passar o userId', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.getAccountsByUserId = jest.fn().mockReturnValue([]);
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const result = await accountsMaintenance.getAccountsByUserId();
        expect(result).toEqual({ status: 400, errors: { errors: "Id não enviado", message: "Id não identificado." } });
    });

    test('Deve verificar o funcionamento da função quando dá erro', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.getAccountsByUserId = jest.fn().mockImplementation(() => {
            throw new Error('Forçando erro');
        });
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const result = await accountsMaintenance.getAccountsByUserId(1);
        expect(result).toEqual({ status: 500, errors: { errors: 'Forçando erro', message: "Erro inesperado aconteceu!Forçando erro" } });
    });
});

describe('Função createAccount', () => {
    test('Deve verificar o funcionamento correto da função', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.createAccountByUserId = jest.fn();
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const accountData = { name: 'Account 1' };
        const result = await accountsMaintenance.createAccount(accountData);
        expect(result).toEqual({ status: 201, data: { message: 'Conta Account 1 criada com sucesso!' } });
    });

    test('Deve verificar o funcionamento da função com a passagem de parâmetro errada', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.createAccountByUserId = jest.fn();
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const accountData = 'Account 1';
        const result = await accountsMaintenance.createAccount(accountData);
        expect(result).toEqual({ status: 400, errors: { errors: 'Dados da conta inválidos', message: 'Dados da conta não identificados ou inválidos.' } });
    });

    test('Deve verificar o funcionamento da função quando dá erro', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.createAccountByUserId = jest.fn().mockImplementation(() => {
            throw new Error('Forçando erro');
        });
        const accountData = { name: 'Account 1' };
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const result = await accountsMaintenance.createAccount(accountData);
        expect(result).toEqual({ status: 500, errors: { errors: 'Forçando erro', message: "Erro inesperado aconteceu!Forçando erro" } });
    });
});

describe('Função createCard', () => {
    test('Deve verificar o funcionamento correto da função', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.createCardByAccountId = jest.fn();
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const cardData = { numberCard: 1234567890123456, name: 'Thiago Santos', dueDay: '10', limitCard: 1000.00 };
        const result = await accountsMaintenance.createCard(cardData);
        expect(result).toEqual({ status: 201, data: { message: 'Cartão de Crédito criado com sucesso!' } });
    });

    test('Deve verifcar o funcionamento da função sem enviar o parâmetro', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.createCardByAccountId = jest.fn();
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const result = await accountsMaintenance.createCard();
        expect(result).toEqual({ status: 400, errors: { errors: 'Dados do cartão não enviados', message: 'Dados do cartão não identificados.' } });
    });

    test('Deve verificar o funcionamento da função quando dá error', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.createCardByAccountId = jest.fn().mockImplementation(() => {
            throw new Error('Forçando erro');
        });
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const cardData = { numberCard: 1234567890123456, name: 'Thiago Santos', dueDay: '10', limitCard: 1000.00 };
        const result = await accountsMaintenance.createCard(cardData);
        expect(result).toEqual({ status: 500, errors: { errors: new Error('Forçando erro'), message: 'Erro inesperado aconteceu!Forçando erro' } });
    });
});

describe('Função createMovementExtract', () => {
    test('Deve verificar o funcionamento correto da função sendo do tipo de conta corrente', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.getAccountById = jest.fn().mockReturnValue({ id: 1, balance: 100 });
        accountsRepositoryMock.createMovementExtract = jest.fn();
        accountsRepositoryMock.updateBalanceByAccountId = jest.fn();
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const movementExtractData = { accountsId: 1, value: 50, type_movement: 1 };
        const result = await accountsMaintenance.createMovementExtract(movementExtractData);
        expect(result).toEqual({ status: 200, data: { message: 'Movimentação salva com sucesso' } });
    });

    test('Deve verificar o funcionamento correto da função sendo do tipo de conta poupança', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.getAccountById = jest.fn().mockReturnValue({ id: 1, balance: 100 });
        accountsRepositoryMock.createMovementExtract = jest.fn();
        accountsRepositoryMock.updateBalanceByAccountId = jest.fn();
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const movementExtractData = { accountsId: 1, value: 50, type_movement: 2 };
        const result = await accountsMaintenance.createMovementExtract(movementExtractData);
        expect(result).toEqual({ status: 200, data: { message: 'Movimentação salva com sucesso' } });
    });

    test('Deve verificar o funcionamento da função quando o valor for negativo', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.getAccountById = jest.fn().mockReturnValue({ id: 1, balance: 100 });
        accountsRepositoryMock.createMovementExtract = jest.fn();
        accountsRepositoryMock.updateBalanceByAccountId = jest.fn();
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const movementExtractData = { accountsId: 1, value: -50, type_movement: 1 };
        const result = await accountsMaintenance.createMovementExtract(movementExtractData);
        expect(result).toEqual({ status: 500, errors: { error: "VALOR NEGATIVO", message: 'O valor da movimentação não pode ser negativo' } });
    });

    test('Deve verificar o funcionamento da função quando não retorna conta', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.getAccountById = jest.fn();
        accountsRepositoryMock.createMovementExtract = jest.fn();
        accountsRepositoryMock.updateBalanceByAccountId = jest.fn();
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const movementExtractData = { accountsId: 1, value: 50, type_movement: 1 };
        const result = await accountsMaintenance.createMovementExtract(movementExtractData);
        expect(result).toEqual({ status: 404, errors: { error: "Conta não encontrada", message: 'A conta não existe' } });
    });

    test('Deve verificar o funcionamento da função quando não é passado o parâmetro', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.getAccountById = jest.fn();
        accountsRepositoryMock.createMovementExtract = jest.fn();
        accountsRepositoryMock.updateBalanceByAccountId = jest.fn();
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const result = await accountsMaintenance.createMovementExtract();
        expect(result).toBeTruthy();
    });
});

describe('Função createMovementInvoice', () => {
    test('Deve verificar o funcionamento correto da função sendo do tipo de conta corrente', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.getCardById = jest.fn().mockReturnValue({ value: 100, limit_card: 1000 });
        accountsRepositoryMock.createMovementInvoice = jest.fn();
        accountsRepositoryMock.updatValuesCardById = jest.fn();
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const movementInvoiceData = { cardId: 1, value: 50, type_movement: 1 };
        const result = await accountsMaintenance.createMovementInvoice(movementInvoiceData);
        expect(result).toEqual({ status: 200, data: { message: 'Movimentação salva com sucesso' } });
    });

    test('Deve verificar o funcionamento correto da função sendo do tipo de conta poupança', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.getCardById = jest.fn().mockReturnValue({ value: 100, limit_card: 1000 });
        accountsRepositoryMock.createMovementInvoice = jest.fn();
        accountsRepositoryMock.updatValuesCardById = jest.fn();
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const movementInvoiceData = { cardId: 1, value: 50, type_movement: 2 };
        const result = await accountsMaintenance.createMovementInvoice(movementInvoiceData);
        expect(result).toEqual({ status: 200, data: { message: 'Movimentação salva com sucesso' } });
    });

    test('Deve verificar o funcionamento da função quando o valor for negativo', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.getCardById = jest.fn().mockReturnValue({ value: 100, limit_card: 1000 });
        accountsRepositoryMock.createMovementInvoice = jest.fn();
        accountsRepositoryMock.updatValuesCardById = jest.fn();
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const movementInvoiceData = { cardId: 1, value: -50, type_movement: 2 };
        const result = await accountsMaintenance.createMovementInvoice(movementInvoiceData);
        expect(result).toEqual({ status: 500, errors: { error: "VALOR NEGATIVO", message: 'O valor da transação não pode ser negativo' } });
    });

    test('Deve verificar o funcionamento da função quando o valor for negativo', async () => {
        const accountsRepositoryMock = jest.fn();
        accountsRepositoryMock.getCardById = jest.fn().mockReturnValue({ value: 100, limit_card: 1000 });
        accountsRepositoryMock.createMovementInvoice = jest.fn();
        accountsRepositoryMock.updatValuesCardById = jest.fn();
        const accountsMaintenance = new AccountsMaintenance(accountsRepositoryMock);
        const result = await accountsMaintenance.createMovementInvoice();
        expect(result).toBeTruthy();
    });
});