import { JogoController } from "./jogo"

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
    test('Retorna 400 se o titulo não for passado', () => {
        const {sut} = constroiSut()
        const requisicaoHttp = {
            corpo: {
                imagem: 'imagem_qualquer'
            }
        }
        const respostaHttp = sut.salvarJogo(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.corpo[0].message).toEqual('falta o parametro: titulo')
    })

    test('Retorna 400 se a imagem não for passado', () => {
        const {sut} = constroiSut()
        const requisicaoHttp = {
            corpo: {
                titulo: 'titulo_qualquer'
            }
        }
        const respostaHttp = sut.salvarJogo(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.corpo[0].message).toEqual('falta o parametro: imagem')
    })
})