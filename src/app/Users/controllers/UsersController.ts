import { Request, Response } from "express"

class UsersControllers {
    async index(req: Request, res: Response): Promise<Response> {
        const users = [{id: '456', email: 'thiago@gmail.com'}]

        return res.status(200).json(users)
    }
}

export default new UsersControllers()