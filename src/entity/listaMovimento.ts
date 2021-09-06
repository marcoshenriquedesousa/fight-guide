import {Entity, Column, ManyToOne} from "typeorm";
import { EntidadeBase } from "./EntidadeBase";
import { Personagem } from "./personagem";

@Entity()
export class ListaMovimento extends EntidadeBase{
    @Column()
    dificuldade: string

    @Column()
    video: string

    @Column()
    imagem: string
    
    @ManyToOne(() => Personagem, {eager: true})
    jogo: Personagem;
}