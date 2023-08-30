import { Request, Response } from "express"
import AccountsService from "@app/Accounts/services/AccountsService"

class AccountsController {
    async createAccounts(req: Request, res: Response): Promise<Response> {
        const {name, typeaccount, balance} = req.body;
        const userId = req.user.id
        const result = await new AccountsService().createAccountByUserId(userId, name, typeaccount, balance)
        return res.status(200).send()
    }
}

export default new AccountsController()