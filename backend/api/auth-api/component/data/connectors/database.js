const { Pool } = require('pg');
class Database {
    async configureConnection() {
        if(!global.databaseConnection) {
            global.databaseConnection = new Pool({
                user: process.env.POSTGRES_USER,
                host: process.env.POSTGRES_HOST,
                database: process.env.POSTGRES_DATABASE,
                password: process.env.POSTGRES_PASS,
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