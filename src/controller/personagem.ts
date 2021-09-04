import { BaseControlador } from "./base";
import { Request } from 'express'
import { Personagem } from "../entity/personagem";

export class PersonagemController extends BaseControlador<Personagem> {
    constructor() {
        super(Personagem)
    }

    async salvarPersonagem(requisicao: Request){
        const _personagem = <Personagem>requisicao.body
        super.isRequired(_personagem.nome, 'falta o parametro: nome')
        return super.salvar(_personagem) 
    }
}