import { BaseControlador } from "./base"

interface SutTipo {
  sut: BaseControlador 
}

const fazerSut = (): SutTipo => {
    const sut = new BaseControlador()
    return {
        sut
    }
} 

describe('BaseControlador', () => {
    test('Retorna 400 se o modelo não for passsado', () => {
        const { sut } = fazerSut()
        const requisicaoHttp = null
        const respostaHttp = sut.salvar(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.erro).toEqual(new Error('Modelo invalido')) 
    })  
})