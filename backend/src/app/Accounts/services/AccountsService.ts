import Database from '@/lib/database';
import AccountsError from "@app/Accounts/exceptions/AccountsError"

interface CreateAccountResponse {
    status: boolean;
    message: string;
}

class AccountsService {
    private databaseConnector: Database;
    
    constructor(){
        this.databaseConnector = new Database()
    }

    async createAccountByUserId(userId:string, name:string, typeaccount:number, balance:number): Promise<CreateAccountResponse>{
        const conn = await this.databaseConnector.generateConnection()
        try{
            conn.query(`
                INSERT INTO accounts(id, user_id, name, typeaccounts, balance) VALUES(nextval('seq_accounts_id'), $1, $2, $3, $4)
            `, [userId, name, typeaccount, balance])
        }catch(error){
            const retornoJson: CreateAccountResponse = {
                status: false,
                message: "Erro ao cadastrar a sua conta.",
            };
            return retornoJson
        }
        const retornoJson: CreateAccountResponse = {
            status: true,
            message: "Conta cadastrada com sucesso.",
        };
        return retornoJson;
    }
}

export default AccountsService