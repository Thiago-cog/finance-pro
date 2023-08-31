import { Router } from "express"
import authRoutes from '@app/Auth/routes'
import usersRoutes from '@app/Users/routes'
import accountsRoutes from '@app/Accounts/routes'

const routes = Router()
routes.use(authRoutes)
routes.use(usersRoutes)
routes.use(accountsRoutes)

export default routes