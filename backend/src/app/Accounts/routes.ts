import { Router } from "express"
import accounts from "@app/Accounts/controllers/AccountsController"
import authenticateToken from '@app/Auth/middlewares/AuthMiddleware'

const routes = Router()
routes.post('/accounts/create-accounts', authenticateToken, accounts.createAccounts)
// routes.delete('/auth/logout', authenticateToken, auth.logout)

export default routes