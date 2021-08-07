import { JogoController } from "./jogo"

interface SutTipos {
    sut: JogoController
}

const fazerSut = (): SutTipos => {
    const sut = new JogoController()
    return {
        sut
    }
}

describe('JogoControlador', () => {
    test('Retorna 400 se o titulo não for passado', () => {
        const { sut } = fazerSut()
        const requisicaoHttp = {
            corpo: {
                imagem: 'imagem_qualquer'
            }
        }
        const respostaHttp = sut.salvar(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.corpo).toEqual(new Error('falta o parametro: titulo'))
    })

    test('Retorna 400 se a imagem não for passado', () => {
        const { sut } = fazerSut()
        const requisicaoHttp = {
            corpo: {
                titulo: 'titulo_qualquer'
            }
        }
        const respostaHttp = sut.salvar(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.corpo).toEqual(new Error('falta o parametro: imagem'))
    })
})