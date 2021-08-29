import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import config from "./configuration/config";
import { createConnection } from "typeorm";
import { criaTypeOemCom } from "../utils/criaTypeOrmCon";

const app = express();
app.use(bodyParser.json());

// Routes.forEach(route => {
//     (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
//         const result = (new (route.controller as any))[route.action](req, res, next);
//         if (result instanceof Promise) {
//             result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

//         } else if (result !== null && result !== undefined) {
//             res.json(result);
//         }
//     });
// });

app.listen(config.port, '0.0.0.0', async () => {
    console.log(`Api inicializada na porta ${config.port}`)
    try {
        await criaTypeOemCom()
        console.log('Banco de Dados conectado')
    } catch (error) {
        console.error('Banco de Dados não conectado', error)        
    }
})