const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const SendEmail = require('../../../services/send-email/send-email');


class UserAuthorization {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.saltRounds = 10;
        this.sendEmail = new SendEmail();
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

    async login(userData) {
        let result = {}
        try {
            const { email, password } = userData;
            const user = await this.userRepository.getUserByEmail(email);
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch || email !== user.email) {
                result.status = 401,
                    result.errors = {
                        message: "Email ou senha incorreto."
                    }
                return result;
            }

            const { id, fullname, phone } = user;
            const userToken = {
                id,
                fullname,
                email,
                phone
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
                    phone
                },
                token,
                message: "Usuário logado com sucesso!"
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

    async register(userData) {
        let result = {}
        try {
            const { email, password, fullname } = userData;
            const hash = await bcrypt.hash(password, this.saltRounds);
            
            const userId = await this.userRepository.createUser(email, hash, fullname);

            const confirmToken = crypto.randomBytes(20).toString('hex');

            await this.userRepository.setTokenByUserId(confirmToken, userId);
            
            this.sendEmail.sendAccountCreation(email, fullname, confirmToken);
            
            result.status = 201;
            result.data = {
                message: "Usuário cadastrado com sucesso!"
            }
        } catch (error) {
            result.status = 500
            result.errors = {
                errors: error,
                message: "Erro inesperado aconteceu!" + error.message
            }
        }
        return result;
    }

    async updateUser(userData) {
        let result = {};

        try {
            const { email, password, fullname, phone, userId } = userData;
            let hash = null;

            if (password) {
                hash = await bcrypt.hash(password, this.saltRounds);
            }

            await this.userRepository.updateUserById(fullname, email, phone, hash, userId);
            result.status = 201;
            result.data = {
                message: "Usuário alterado com sucesso!"
            }
        } catch (error) {
            result.status = 500
            result.errors = {
                errors: error,
                message: "Erro inesperado aconteceu!" + error.message
            }
        }
        return result;
    }

    async confirmEmail(token) {
        let result = {};
        try {

            if (!token) {
                result.status = 400;
                result.errors = {
                    errors: 'Token não informada ',
                    message: "Usuário não identificado."
                }
                return result;
            }

            await this.userRepository.confirmUserEmail(token);

            result.status = 200;
            result.data = {
                message: "Email confirmado com sucesso!"
            }

        } catch (error) {
            result.status = 500
            result.errors = {
                errors: error,
                message: "Erro inesperado aconteceu!" + error.message
            }
        }

        return result;
    }

    async getEmailByToken(token) {
        let result = {};
        try {

            if (!token) {
                result.status = 400;
                result.errors = {
                    errors: 'Token não informada ',
                    message: "Usuário não identificado."
                }
                return result;
            }

            const resultUser = await this.userRepository.getEmailByTokenConfirmEmail(token);

            result.status = 200;
            result.data = {
                userEmail: resultUser
            }

        } catch (error) {
            result.status = 500
            result.errors = {
                errors: error,
                message: "Erro inesperado aconteceu!" + error.message
            }
        }

        return result;
    }

    async forgotPassword(email) {
        let result = {}
        try {

            if (!email) {
                result.status = 400;
                result.errors = {
                    errors: 'Email não informada ',
                    message: "Usuário não identificado."
                }
                return result;
            }

            const findUserByEmail = await this.userRepository.findUserByEmail(email);

            if(!findUserByEmail) {
                result.status = 400;
                result.errors = {
                    errors: 'Email informado não encontrado',
                    message: "Email informado não registrado na plataforma, por favor verificar o email."
                }
                return result;
            }

            const forgotPasswordToken = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);

            await this.userRepository.setTokenAndExpiresByEmail(forgotPasswordToken, now, email);

            this.sendEmail.sendForgotPassword(email, forgotPasswordToken);
            
            result.status = 200;
            result.data = {
                message: "Email enviado com sucesso!"
            }
        } catch (error) {
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