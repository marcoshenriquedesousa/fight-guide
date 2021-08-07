import {Entity, Column} from "typeorm";
import { EntidadeBase } from "./EntidadeBase";

@Entity()
export class Jogo extends EntidadeBase{
    @Column()
    titulo: string;

    @Column()
    imagem: string;
}
