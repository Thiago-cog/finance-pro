const bcrypt =  require('bcrypt');
const jwt =  require('jsonwebtoken');

class UserAuthorization {
    constructor(userRepository) {
        this.userRepository = userRepository;
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
            result.errors = {
                status: 500,
                errors: error,
                message: "Erro inesperado aconteceu!"
            };

        }

        return result;
    }
}

module.exports = UserAuthorization;