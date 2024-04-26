const { Pool } = require('pg');
const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    
    const connectionStatus = {};
    let status = 200;

    try {
        const pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DATABASE,
            password: process.env.POSTGRES_PASS,
            ssl: { rejectUnauthorized: false }
        });

        pool.end();
        connectionStatus.postgres = true;

    } catch (e) {
        console.error(`Erro na conexão com o postgres no healthcheck: ${e}`);
        status = 500;
        connectionStatus.postgres = false;
    }
    
    res.status(status);
    res.json(connectionStatus);
});

export default router;