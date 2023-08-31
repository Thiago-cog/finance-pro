import { Request, Response } from "express"
import AccountsService from "@app/Accounts/services/AccountsService"

class AccountsController {
    async createAccounts(req: Request, res: Response): Promise<Response> {
        const {name, typeaccount, balance} = req.body;
        const userId = req.user.id
        const result = await new AccountsService().createAccountByUserId(userId, name, typeaccount, balance)

        if(!result.status){
            return res.status(500).json({"message": result.message})
        }
        return res.status(200).json({"message": result.message})
    }
}

export default new AccountsController()