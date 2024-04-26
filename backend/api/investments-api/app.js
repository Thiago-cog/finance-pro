const express = require('express');
const cors = require('cors');
const authUser = require('./routes/authUser.js');
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
            console.log(`Server started at ${port}`);
        });
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    routes() {
        this.app.use('/user', authUser);
        // this.app.use('/investments-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsonDocs));
    }
}

module.exports = App;
