import dotenv from 'dotenv'
dotenv.config();

export default {
    port: Number(process.env.PORT) || 3000,
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    },
    auth: {
        secret: process.env.AUHT_SECRET || 'secrt',
        expiresIn: process.env.AUTH_EXPIRES_IN || '7d',
    }

}