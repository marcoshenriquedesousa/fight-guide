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
        super.isRequired(_personagem.sobreNome, 'falta o parametro: sobreNome')
        super.isRequired(_personagem.imagem, 'falta o parametro: imagem')
        return super.salvar(_personagem) 
    }
}