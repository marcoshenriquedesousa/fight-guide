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

    // test('Retorna 200 se todos os dados forem passados', async () => {
    //     const { sut } = constroiSut()
    //     const requisicaoHttp = {
    //         body: {
    //             titulo: 'titulo_valido',
    //             imagem: 'imagem_valida'
    //         }
    //     }
    //     const respostaHttp = await sut.salvarJogo(requisicaoHttp)
    //     const uid = respostaHttp.body.uid
    //     const creatAt = respostaHttp.body.createAt
    //     const updateAt = respostaHttp.body.updateAt
    //     expect(respostaHttp.codigoStatus).toBe(200)
    //     expect(respostaHttp.body).toEqual({
    //         uid: uid,
    //         titulo: 'titulo_valido',
    //         imagem: 'imagem_valida',
    //         deleted: false,
    //         createAt: creatAt,
    //         updateAt: updateAt
    //     })
    // })
})