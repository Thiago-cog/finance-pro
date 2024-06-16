const Database = require("./connectors/database.js");

class UserRepository {
    constructor() {
        this.databaseConnector = new Database();
    }

    async getUserByEmail(email) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }

    async createUser(email, hash, fullname){
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query("INSERT INTO users(id, email, password, fullname) VALUES(nextval('seq_users_id'), $1, $2, $3) RETURNING id", [email, hash, fullname]);

        return result.rows[0].id;
    }

    async updateUserById(fullname, email, phone, hash, userId) {
        const conn = await this.databaseConnector.generateConnection();
        await conn.query("UPDATE users SET fullname = $1, email = $2, phone = $3 WHERE id = $4;", [fullname, email, phone, userId]);

        if(hash != null) {
            await conn.query("UPDATE users SET password = $1 WHERE id = $2;", [hash, userId]);
        }
    }

    async confirmUserEmail(token) {
        const conn = await this.databaseConnector.generateConnection();
        await conn.query("UPDATE users SET confirmed_email = true, confirm_email_token = null WHERE confirm_email_token = $1", [token]);
    }

    async getEmailByTokenConfirmEmail(token) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query("SELECT email FROM users WHERE confirm_email_token = $1", [token]);
        
        return result.rows;
    }

    async setTokenByUserId(token, userId) {
        const conn = await this.databaseConnector.generateConnection();
        await conn.query("UPDATE users SET confirm_email_token = $1 WHERE id = $2", [token, userId]);
    }

    async findUserByEmail(email) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query("SELECT * FROM users WHERE email = $1", [email]);
        
        return result.rows[0];
    }

    async setTokenAndExpiresByEmail(forgotPasswordToken, now, email) {
        const conn = await this.databaseConnector.generateConnection();
        await conn.query("UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE email = $3", [forgotPasswordToken, now, email]);
    }

    async validateExpiresToken(token) {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query("SELECT password_reset_expires FROM users WHERE password_reset_token = $1", [token]);
        
        return result.rows[0];
    }

    async removeInvalidToken(token) {
        const conn = await this.databaseConnector.generateConnection();
        await conn.query("UPDATE users SET password_reset_token = null, password_reset_expires = null WHERE password_reset_token = $1", [token]);
    }

    async updatePassword(hash, token) {
        const conn = await this.databaseConnector.generateConnection();
        await conn.query("UPDATE users SET password = $1, password_reset_token = null, password_reset_expires = null WHERE password_reset_token = $2", [hash, token]);
    }
}

module.exports = UserRepository;