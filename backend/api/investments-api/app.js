const express = require('express');
const cors = require('cors');
const investiments = require('./routes/investments.js');
const healthcheck = require('./routes/healthcheck.js');

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
        this.app.use('/investments', investiments);
    }
}

module.exports = App;