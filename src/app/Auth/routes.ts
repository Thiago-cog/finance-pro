import { Router } from "express"
import auth from "@app/Auth/controllers/AuthController"

const routes = Router()
routes.post('/auth/sing-in', auth.create)
routes.delete('/auth/sing-out', auth.destroy)

export default routes