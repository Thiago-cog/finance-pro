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

    async createCard(req, res){
        const { accountsId, numberCard, dueDay, limitCard } = req.body;
        let value = 0;

        if(req.body.value){
            value = req.body.value;
        }

        const result = await new AccountsService().createCardByAccountId(accountsId, numberCard, dueDay, limitCard, value);

        if (!result.status) {
            return res.status(500).json({ "message": result.message });
        }
        return res.status(200).json({ "message": result.message });
    }

    async createMovementExtract(req, res){
        const { accountsId, value, type_movement, date_movement, month, year } = req.body;

        const result = await new AccountsService().createMovementExtract(accountsId, value, type_movement, date_movement, month, year);

        if (!result.status) {
            return res.status(500).json({ "message": result.message });
        }
        return res.status(200).json({ "message": result.message });
    }

    async createMovementInvoice(req, res){
        const { cardId, value, type_movement, date_movement, month, year } = req.body;

        const result = await new AccountsService().createMovementInvoice(cardId, value, type_movement, date_movement, month, year);

        if (!result.status) {
            return res.status(500).json({ "message": result.message });
        }
        return res.status(200).json({ "message": result.message });
    }
}

module.exports = new AccountsController();
