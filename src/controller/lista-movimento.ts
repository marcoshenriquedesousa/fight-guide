import { BaseControlador } from "./base"
import { Request } from 'express'
import { ListaMovimento } from "../entity/listaMovimento"

export class ListaDeMovimentoController extends BaseControlador<ListaMovimento>{
    constructor(){
        super(ListaMovimento)
    }

    async SalvarLista(requisicao: Request){
        const _listaMovimento = <ListaMovimento>requisicao.body
        super.isRequired(_listaMovimento.dificuldade, 'falta o parametro: dificuldade')
        super.isRequired(_listaMovimento.imagem, 'falta o parametro: imagem')
        super.isRequired(_listaMovimento.video, 'falta o parametro: video')
        super.isRequired(_listaMovimento.personagem, 'falta o parametro: personagem')
        return super.salvar(_listaMovimento)
    }
}