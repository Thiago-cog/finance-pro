const { Request, Response } = require("express");
const AuthService = require("../services/AuthService");
const AuthError = require("../exceptions/AuthError");

class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        const authService = new AuthService();
        const {user, token, status, message} = await authService.singIn(email, password, req);

        req.user = { id: user.id, fullName: user.fullname, email: user.email, token };
        
        if(status == 200){
            return res.status(status).json({ user, token , message});
        }else{
            return res.status(status).json({ message }); 
        }
    }

    async logout(req, res) {
        const authService = new AuthService();
        await authService.singOut(req.user.token);
        return res.status(204).send();
    }
}

module.exports = new AuthController();
