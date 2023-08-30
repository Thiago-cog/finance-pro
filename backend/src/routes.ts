import { Router } from "express"
import authRoutes from '@app/Auth/routes'
import usersRoutes from '@app/Users/routes'

const routes = Router()
routes.use(authRoutes)
routes.use(usersRoutes)

export default routes