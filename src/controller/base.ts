import { Request } from 'express';
import { NotificacaoBase } from "../entity/NotificacaoBase";

export abstract class BaseControlador<T> extends NotificacaoBase{

    // private _repository: Repository<T>

    constructor(entidade: any){
        super()
        // this._repository = getRepository<T>(entidade)
    }

    salvar(modelo: any) {
        console.log("reposta do modelo::", modelo)
        if(!modelo.titulo) {
            return {
                codigoStatus: 400,
                corpo: this.notifications
            }
        }

        if(!modelo.imagem) {
            return {
                codigoStatus: 400,
                corpo: this.notifications
            }
        }
    }
}