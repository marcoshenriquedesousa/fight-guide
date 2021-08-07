import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class EntidadeBase {
   
    @PrimaryGeneratedColumn("uuid")
    uid: string;
    
    @Column({default: false})
    deleted: Boolean;

    @CreateDateColumn({type: 'timestamp'})
    createAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updateAt: Date;
}