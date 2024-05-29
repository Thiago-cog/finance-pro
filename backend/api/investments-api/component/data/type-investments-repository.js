const Database = require("./connectors/database.js");

class TypeInvestmentsRepository {

    constructor() {
        this.databaseConnector = new Database();
    }

    async getTypeInvestments() {
        const conn = await this.databaseConnector.generateConnection();
        const result = await conn.query(`SELECT id, name_type AS name FROM type_investments`);
        return result.rows;
    }
}

module.exports = TypeInvestmentsRepository;