import { Request } from 'express';
import { getRepository, Repository } from 'typeorm';
import { NotificacaoBase } from "../entity/NotificacaoBase";

export abstract class BaseControlador<T> extends NotificacaoBase {

    private _repository: Repository<T>
    constructor(entidade: any) {
        super()
        this._repository = getRepository<T>(entidade)
    }

    async salvar(modelo: any) {
        if (this.valid()) return {
            codigoStatus: 200,
            body: await this._repository.save(modelo)
        }

        else return {
            codigoStatus: 400,
            body: this.notifications[0]
        }
    }
}