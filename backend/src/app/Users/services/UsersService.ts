import Database from '@/lib/database';
import UsersError from "@app/Users/exceptions/UsersError"

export default class AuthService {
    private databaseConnector: Database;
    static getAllUsers: any;

    constructor(){
        this.databaseConnector = new Database()
    }

    async createUser(email: string, password: string, fullname: string): Promise<boolean>{
        const conn = await this.databaseConnector.generateConnection()
        
        try{
            conn.query("INSERT INTO users(id, email, password, fullname) VALUES(nextval('seq_users_id'), $1, $2, $3)", [email, password, fullname])
            return true
        }catch(error){
            throw new UsersError('Erro ao criar usuário')
        }
        
    }

    async getAllUsers(): Promise<object> {
        const conn = await this.databaseConnector.generateConnection()
        const result = await conn.query('SELECT fullname, email FROM users')
        
        let returnJson = {
            users: result.rows
        }

        return returnJson
    }
}