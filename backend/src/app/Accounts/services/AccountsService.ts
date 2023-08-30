import Database from '@/lib/database';
import AccountsError from "@app/Accounts/exceptions/AccountsError"

class AccountsService {
    private databaseConnector: Database;
    
    constructor(){
        this.databaseConnector = new Database()
    }

    async createAccountByUserId(userId:string, name:string, typeaccount:number, balance:number): Promise<boolean>{
        const conn = await this.databaseConnector.generateConnection()
        try{
            conn.query(`
                INSERT INTO accounts(id, user_id, name, typeaccounts, balance) VALUES(nextval('seq_accounts_id'), $1, $2, $3, $4)
            `, [userId, name, typeaccount, balance])
            return true
        }catch(error){
            throw new AccountsError('Erro ao criar conta, verifique os campos porfavor')
        }
        
    }
}

export default AccountsService