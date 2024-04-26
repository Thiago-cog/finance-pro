const express = require('express');
const cors = require('cors');
const accounts = require('./routes/accounts.js');
const healthcheck = require('./routes/healthcheck.js');
const swaggerUi = require('swagger-ui-express');
const swaggerJsonDocs = require('./swagger.json');

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log(`Api rodando na porta: ${port}`);
        });
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    routes() {
        this.app.use('/', healthcheck);
        this.app.use('/account', accounts);
        this.app.use('/accounts-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsonDocs));
    }
}

module.exports = App;
