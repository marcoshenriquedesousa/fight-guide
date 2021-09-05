import { criaTypeOemCom } from "../../utils/criaTypeOrmCon"
import { JogoController } from "./jogo"


beforeAll(async () => {
    await criaTypeOemCom()
})
interface TipoStub {
    sut: JogoController
}

const constroiSut = (): TipoStub => {
    const sut = new JogoController()
    return {
        sut,
    }
}

let uid = ""


describe('JogoControlador', () => {
    test('Retorna 400 se o titulo não for passado', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                imagem: 'imagem_qualquer'
            }
        }
        const respostaHttp = await sut.salvarJogo(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.body.mensagem).toEqual('falta o parametro: titulo')
    })

    test('Retorna 400 se a imagem não for passado', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                titulo: 'titulo_qualquer'
            }
        }
        const respostaHttp = await sut.salvarJogo(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.body.mensagem).toEqual('falta o parametro: imagem')
    })

    test('Retorna 200 se todos os dados forem passados', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                titulo: 'titulo_valido',
                imagem: 'imagem_valida'
            }
        }
        const respostaHttp = await sut.salvarJogo(requisicaoHttp)
        uid = respostaHttp.body.uid
        const creatAt = respostaHttp.body.createAt
        const updateAt = respostaHttp.body.updateAt
        expect(respostaHttp.codigoStatus).toBe(200)
        expect(respostaHttp.body).toEqual({
            uid: uid,
            titulo: 'titulo_valido',
            imagem: 'imagem_valida',
            deleted: false,
            createAt: creatAt,
            updateAt: updateAt
        })
    })

    test('Retorna 400 se o uid não for encontrado no update', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                uid: 'uid_invalido',
                titulo: 'titulo_invalido'
            }
        }
        const respostaHttp = await sut.salvar(requisicaoHttp.body)
        expect(respostaHttp.codigoStatus).toBe(404)
        expect(respostaHttp.body).toEqual('uid não encontrado')
    })

    test('Retorna 200 se o uid for encontrado no update', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                uid: uid,
                titulo: 'titulo_editado'
            }
        }
        const respostaHttp = await sut.salvar(requisicaoHttp.body)
        const updateAt = respostaHttp.body.updateAt
        expect(respostaHttp.codigoStatus).toBe(200)
        expect(respostaHttp.body).toEqual({
            uid: uid,
            titulo: 'titulo_editado',
            updateAt: updateAt
        })
    })

    test('Retorna 400 se o uid não for encontrado na exclusão', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            params: {
                id: "Uid_invalido",
            }
        }
        const respostaHttp = await sut.excluir(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(404)
        expect(respostaHttp.body).toEqual('uid não encontrado')
    })

    test('Retorna 200 se o uid for encontrado na exclusão', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            params: {
                id: uid,
            }
        }
        const respostaHttp = await sut.excluir(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(200)
        expect(respostaHttp.body).toEqual('item excluido com sucesso')
    })
})