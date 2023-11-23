const UserAuthorization = require('../user-authorization');
const dotenv = require('dotenv');
dotenv.config();

const userRepositoryMock = () => {
    class UserRepository {
        getUserByEmail(email) { }
        createUser(email, hash, fullname) { }
    }
    return new UserRepository()
}

const userRepository = userRepositoryMock();
jest.mock('bcrypt', () => {
    return {
        compare: jest.fn().mockImplementation((inputPassword, storedPassword) => {
            if (inputPassword === '12345678' && storedPassword === '12345678') {
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        }),
        hash: jest.fn().mockImplementation(() => Promise.resolve(true))
    };
});

describe('Função decodeToken', () => {
    test('Funcionamento correto da função', async () => {
        const userAuthorization = new UserAuthorization(userRepository);
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVG9rZW4iOnsiaWQiOiIxIiwiZnVsbG5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MDA2OTgxNTYsImV4cCI6MTcwMTMwMjk1Nn0.1CyQe1hapAq3KoDUD-lLhamvzTT_iMmFe5nFr0x8Jqc';
        const result = await userAuthorization.decodeToken(token);

        expect(result).toBeTruthy();
    });

    test('Funcionamento da função passando o token errado', async () => {
        const userAuthorization = new UserAuthorization(userRepository);
        const token = 'token';
        const result = await userAuthorization.decodeToken(token);
        expect(result).toStrictEqual({ "errors": { "errors": "jwt malformed", "message": "Erro inesperado aconteceu!jwt malformed" }, "status": 500 });
    });

    test('Funcionamento da função sem passar o token', async () => {
        const userAuthorization = new UserAuthorization(userRepository);
        const result = await userAuthorization.decodeToken();
        expect(result).toStrictEqual({ "errors": { "errors": "Token não enviado", "message": "Token não identificado." }, "status": 403 });
    });
});

describe('Função login', () => {
    test('Funcionamento correto da função', async () => {
        const userData = {
            "email": "adm@gmail.com",
            "password": "12345678"
        }

        const userAuthorization = new UserAuthorization(userRepository);
        jest.spyOn(userRepository, 'getUserByEmail').mockReturnValueOnce({ "email": "adm@gmail.com", "password": "12345678" });
        const result = await userAuthorization.login(userData);

        expect(result).toBeTruthy();
    });

    test('Funcionamento da função com a senha ou email incorretos', async () => {
        const userData = {
            "email": "adm@gmail.com",
            "password": "1234"
        }

        const userAuthorization = new UserAuthorization(userRepository);
        jest.spyOn(userRepository, 'getUserByEmail').mockReturnValueOnce({ "email": "adm@gmail.com", "password": "12345678" });
        const result = await userAuthorization.login(userData);

        expect(result).toStrictEqual({"errors": {"message": "Email ou senha incorreto."}, "status": 401});
    });

    test('Funcionamento da função sem passar os parâmetros', async () => {
        const userData = {}
        const userAuthorization = new UserAuthorization(userRepository);
        const result = await userAuthorization.login(userData);

        expect(result).toStrictEqual({"errors": {"errors": "Cannot read properties of undefined (reading 'password')", "message": "Erro inesperado aconteceu!Cannot read properties of undefined (reading 'password')"}, "status": 500});
    });
});

describe('Função register',  () => {
    test('Funcionamento correto da função', async () => {
        const userData = {
            "email": "thiago.santos@gmail.com",
            "password": "12345678",
            "fullname": "Thiago Santos"
        }
        const userAuthorization = new UserAuthorization(userRepository);
        const result = await userAuthorization.register(userData);
        expect(result).toStrictEqual({"data": {"message": "Usuário cadastrado com sucesso!"}, "status": 201});
    });

    test('Funcionamento da função sem passar os parâmetros', async () => {
        const userAuthorization = new UserAuthorization(userRepository);
        const result = await userAuthorization.register();
        expect(result).toBeTruthy();
    });
});