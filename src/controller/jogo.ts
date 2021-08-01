import { Request } from 'express'

export class JogoController {
    salvar(requesicao: Request): any {
        return {
            codigoStatus: 400,
            corpo: new Error('falta o parametro: titulo')
        }
    }
}