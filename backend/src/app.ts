import express, {Application} from 'express'
import cors from 'cors'
import routes from '@/routes'
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "@/swagger.json"

export default class App{
    app: Application

    constructor(){
        this.app = express();
        this.middelwares();
        this.routes();
    }
    listen(port: number):void {
        this.app.listen(port,()=>{
            console.log(`Server started at ${port}`)
        })
    }

    private middelwares(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors())
    }

    private routes(){
        this.app.use(routes)
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    }
}