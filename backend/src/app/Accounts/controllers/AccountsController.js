const { Request, Response } = require("express");
const AccountsService = require("../services/AccountsService");

class AccountsController {
    async createAccounts(req, res) {
        const { name, typeaccount, balance } = req.body;
        const userId = req.user.id;
        const result = await new AccountsService().createAccountByUserId(userId, name, typeaccount, balance);

        if (!result.status) {
            return res.status(500).json({ "message": result.message });
        }
        return res.status(200).json({ "message": result.message });
    }
}

module.exports = new AccountsController();
