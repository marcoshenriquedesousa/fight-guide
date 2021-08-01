import { JogoController } from "./jogo"
describe('JogoController', () => {
    test('Retorna 400 se o titulo não for passado', () => {
        const sut = new JogoController()
        const requisicaoHttp = {
            corpo: {
                imagem: 'imagem_qualquer'
            }
        }
        const respostaHttp = sut.salvar(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.corpo).toEqual(new Error('falta o parametro: titulo'))
    })
})