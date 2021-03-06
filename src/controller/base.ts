import { getRepository, Repository } from 'typeorm';
import { NotificacaoBase } from "../entity/NotificacaoBase";
import { Request } from 'express'

export abstract class BaseControlador<T> extends NotificacaoBase {

    private _repository: Repository<T>
    constructor(entidade: any) {
        super()
        this._repository = getRepository<T>(entidade)
    }


    async todos() {

        const resultado = await this._repository.find({
            where: {
                'deleted': false
            }
        });

        if (resultado.length == 0) {
            return {
                codigoStatus: 404,
                mensagem: 'Lista vazia'
            }
        } else return {
            codigoStatus: 200,
            body: resultado
        }
    }

    async retornaUm(request: Request) {
        let resultado = await this._repository.findOne(request.params.id)

        if(!resultado) {
            return {
                codigoStatus: 404,
                mensagem: 'Obejeto não encontrado'
            }
        } else {
            return {
                codigoStatus: 200,
                body: resultado
            }
        }
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
                mensagem: 'uid não encontrado'
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
            await this._repository.save(modelo)
            return {
                codigoStatus: 200,
                mensagem: 'item excluido com sucesso'
            }
        } else
            return {
                codigoStatus: 404,
                mensagem: 'uid não encontrado'
            }
    }

    get repository(): Repository<T> {
        return this._repository
    }
}