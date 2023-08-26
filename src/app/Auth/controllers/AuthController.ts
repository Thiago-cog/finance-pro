import { Request, Response } from "express"
import AuthService from "@app/Auth/services/AuthService"
import AuthError from "@app/Auth/exceptions/AuthError"

class AuthController {
    
    async create(req: Request, res: Response): Promise<Response> {
        
        const {email, password} = req.body

        try{
            const authService = new AuthService()
            const {user, token} = await authService.singIn(email, password)
            return res.status(200).json({user, token})
        }catch(error) {
            if (error instanceof AuthError) return res.status(401).send()
            return res.status(500).send({error})
        }
    }

    async destroy(req: Request, res: Response): Promise<Response> {
        const authService = new AuthService()
        await authService.singOut(req.user.token)
        return res.status(204).send()
    }
}

export default new AuthController