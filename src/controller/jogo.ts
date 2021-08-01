import { Request } from 'express'

export class JogoController {
    salvar(requesicao: Request): any {
        if(!requesicao.corpo.titulo) {
            return {
                codigoStatus: 400,
                corpo: new Error('falta o parametro: titulo')
            }
        }

        if(!requesicao.corpo.imagem) {
            return {
                codigoStatus: 400,
                corpo: new Error('falta o parametro: imagem')
            }
        }
    }
}