import { Request, Response } from "express"
import UsersService from "@app/Users/services/UsersService"

class UsersControllers {
    async index(req: Request, res: Response): Promise<Response> {
        const users = await new UsersService().getAllUsers()

        return res.status(200).json(users)
    }

    async create(req: Request, res: Response): Promise<Response> {
        const {email, password, fullname} = req.body
        const insert = await new UsersService().createUser(email, password, fullname)

        if(insert){
            return res.status(201).json({message: 'Usuário criado com sucesso'})
        }else{
            return res.status(200).json({message: 'Erro ao criar usuário'})
        }
    }
}

export default new UsersControllers()