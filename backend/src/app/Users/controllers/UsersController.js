const { Request, Response } = require("express");
const UsersService = require("../services/UsersService");

class UsersControllers {
    async index(req, res) {
        const users = await new UsersService().getAllUsers();

        return res.status(200).json(users);
    }

    async create(req, res) {
        const { email, password, fullname } = req.body;
        const { status, message } = await new UsersService().createUser(email, password, fullname);

        if (status == 201) {
            return res.status(status).json({ message: message });
        } else {
            return res.status(status).json({ message: message });
        }
    }
}

module.exports = new UsersControllers();