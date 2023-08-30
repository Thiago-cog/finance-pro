import { Router } from "express"
import users from "@app/Users/controllers/UsersController"
import authenticateToken from '@app/Auth/middlewares/AuthMiddleware'

const routes = Router()
routes.get('/users', authenticateToken, users.index)
routes.post('/users/create', authenticateToken, users.create)

export default routes