import { JogoController } from "./jogo"

describe('JogoController', () => {
    test('Retorna 400 se não existir o titulo', () => {
        const sut = new JogoController()
        const requisicaoHttp = {
            corpo: {
                imagem: 'imagem_qualquer'
            }
        }
        const respostaHttp = sut.salvar(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
    })
})