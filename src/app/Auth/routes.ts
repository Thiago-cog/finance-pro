import { Router } from "express"
import auth from "@app/Auth/controllers/AuthController"
import authenticateToken from '@app/Auth/middlewares/AuthMiddleware'

const routes = Router()
routes.post('/auth/sing-in', auth.login)
routes.delete('/auth/sing-out', authenticateToken, auth.logout)

export default routes