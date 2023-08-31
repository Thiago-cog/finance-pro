const { Request, Response } = require("express");
const UsersService = require("../services/UsersService");

class UsersControllers {
    async index(req, res) {
        const users = await new UsersService().getAllUsers();

        return res.status(200).json(users);
    }

    async create(req, res) {
        const { email, password, fullname } = req.body;
        const insert = await new UsersService().createUser(email, password, fullname);

        if (insert) {
            return res.status(201).json({ message: 'Usuário criado com sucesso' });
        } else {
            return res.status(200).json({ message: 'Erro ao criar usuário' });
        }
    }
}

module.exports = new UsersControllers();