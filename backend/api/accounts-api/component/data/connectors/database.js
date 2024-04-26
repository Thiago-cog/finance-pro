const { Pool } = require('pg');
class Database {
    async configureConnection() {
        if(!global.databaseConnection) {
            global.databaseConnection = new Pool({
                user: process.env.POSTGRES_USER || 'postgres',
                host: process.env.POSTGRES_HOST || 'localhost',
                database: process.env.POSTGRES_DATABASE || 'login_node',
                password: process.env.POSTGRES_PASS || '123456',
                ssl: {rejectUnauthorized: false}
            });
        }
        return global.databaseConnection;
    }

    async generateConnection() {
        return Promise.resolve(this.configureConnection());
    }
}

module.exports = Database;