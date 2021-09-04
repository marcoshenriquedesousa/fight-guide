import { Request } from 'express'
import { Jogo } from '../entity/Jogo'
import { BaseControlador } from './base'

export class JogoController extends BaseControlador<Jogo> {

    constructor(){
        super(Jogo)
    }

    async salvarJogo(requesicao: Request) {
        const _jogo = <Jogo>requesicao.body
        super.isRequired(_jogo.titulo, 'falta o parametro: titulo')
        super.isRequired(_jogo.imagem, 'falta o parametro: imagem')
        return super.salvar(_jogo);
    }
}