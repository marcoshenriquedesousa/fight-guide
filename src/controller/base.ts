import { getRepository, Repository } from 'typeorm';
import { NotificacaoBase } from "../entity/NotificacaoBase";
import { Request } from 'express'

export abstract class BaseControlador<T> extends NotificacaoBase {

    private _repository: Repository<T>
    constructor(entidade: any) {
        super()
        this._repository = getRepository<T>(entidade)
    }

    async salvar(modelo: any) {
        if (modelo.uid) {

            delete modelo['createAt'];
            delete modelo['updateAt'];
            delete modelo['deleted'];

            let _modelInDB = await this._repository.findOne(modelo.uid);
            if (_modelInDB) {
                Object.assign(_modelInDB, modelo);
            } else return {
                codigoStatus: 404,
                body: 'uid não encontrado'
            }
        }

        if (this.valid()) return {
            codigoStatus: 200,
            body: await this._repository.save(modelo)
        }

        else return {
            codigoStatus: 400,
            body: this.notifications[0]
        }
    }

    async excluir(requisicao: Request) {
        let uid = requisicao.params.id;
        let modelo: any = await this._repository.findOne(uid);
        if (modelo) {
            modelo.deleted = true;
            return this._repository.save(modelo);
        } else
            return {
                codigoStatus: 404,
                body: 'uid não encontrado'
            }
    }
}