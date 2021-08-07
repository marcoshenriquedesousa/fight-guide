import { BaseControlador } from "./base"

describe('BaseControlador', () => {
    test('Retorna 400 se o modelo não for passsado', () => {
        const sut = new BaseControlador()
        const requisicaoHttp = null
        const respostaHttp = sut.salvar(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.erro).toEqual(new Error('Modelo invalido')) 
    })  
})