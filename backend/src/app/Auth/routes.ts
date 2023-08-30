import { Router } from "express"
import auth from "@app/Auth/controllers/AuthController"
import authenticateToken from '@app/Auth/middlewares/AuthMiddleware'

const routes = Router()
routes.post('/auth/login', auth.login)
routes.delete('/auth/logout', authenticateToken, auth.logout)

export default routes