const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: Number(process.env.PORT) || 3000,
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    },
    auth: {
        secret: process.env.AUHT_SECRET || 'secrt',
        expiresIn: process.env.AUTH_EXPIRES_IN || '7d',
    },
    postgres: {
        user: process.env.POSTGRES_USER || 'postgres',
        host: process.env.POSTGRES_HOST || 'localhost',
        port: Number(process.env.POSTGRES_PORT) || 5432,
        database: process.env.POSTGRES_DATABASE || 'login_node',
        password: process.env.POSTGRES_PASS || '123456',
    }
};