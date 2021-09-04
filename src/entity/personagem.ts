import {Entity, Column, ManyToOne} from "typeorm";
import { EntidadeBase } from "./EntidadeBase";
import { Jogo } from "./Jogo";

@Entity()
export class Personagem extends EntidadeBase{
    @Column()
    nome: string

    @Column()
    sobreNome: string

    @Column()
    imagem: string

    @Column()
    listaMovimento: string

    @Column()
    jogoUid: string
    // @ManyToOne(()=> Jogo, {eager: true})
    // jogoUid: Jogo;
}
