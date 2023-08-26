import { Pool } from 'pg'
import config from "@/config"

class Database {
    async configureConnection() {
        const databaseConnection = new Pool({
            user: config.postgres.user,
            host: config.postgres.host,
            database: config.postgres.database,
            password: config.postgres.password,
            port: config.postgres.port,
        })

        return databaseConnection
    }
}

export default Database