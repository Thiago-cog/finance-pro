const bcrypt =  require('bcrypt');
const jwt =  require('jsonwebtoken');

class UserAuthorization {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.saltRounds = 10;
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

    async login(userData) {
        let result = {}
        try{
            const { email, password } = userData;
            const user = await this.userRepository.getUserByEmail(email);
            const passwordMatch = await bcrypt.compare(password, user.password);

            if(!passwordMatch || email !== user.email) {
                result.status = 401,
                result.errors = {
                    message: "Email ou senha incorreto."
                }
                return result;
            }

            const { id, fullname } = user;
            const userToken = {
                id,
                fullname,
                email
            }

            const token = jwt.sign({ userToken }, process.env.AUTH_SECRET, {
                expiresIn: process.env.AUTH_EXPIRES_IN
            });

            result.status = 200;
            result.data = {
                user: {
                    id,
                    fullname,
                    email,
                },
                token,
                message: "Usuário logado com sucesso!"
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
    
    async register(userData) {
        let result = {}
        const [email, password, fullname] = userData
        try{
            const hash = await bcrypt.hash(password, this.saltRounds);
            this.userRepository.createUser(email, hash, fullname);
            result.status = 201;
            result.data = {
                message: "Usuário cadastrado com sucesso!"
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
}

module.exports = UserAuthorization;