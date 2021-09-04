import { criaTypeOemCom } from "../../utils/criaTypeOrmCon"
import { PersonagemController } from "./personagem"

beforeAll(async () => {
    await criaTypeOemCom()
})

interface TipoStub {
    sut: PersonagemController
}

const constroiSut = (): TipoStub => {
    const sut = new PersonagemController()
    return {
        sut,
    }
}


describe('PersonagemControlador', () => {
    test('retorna 400 se o nome não for passado', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                sobreNome: 'sobrenome_qualquer',
                imagem: 'imagem_qualquer',
                jogo: 'Uid_jogo_qualquer',
                listaMovimento: 'lista_qualquer'
            }
        }
        const respostaHttp = await sut.salvarPersonagem(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.body.mensagem).toEqual('falta o parametro: nome')
    })

    test('retorna 400 se o sobreNome não for passado', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                nome: 'nome_qualquer',
                imagem: 'imagem_qualquer',
                listaMovimento: 'lista_qualquer',
                jogo: 'Uid_jogo_qualquer'
            }
        }
        const respostaHttp = await sut.salvarPersonagem(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.body.mensagem).toEqual('falta o parametro: sobreNome')
    })

    test('retorna 400 se a imagem não for passado', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                nome: 'nome_qualquer',
                sobreNome: 'sobrenome_qualquer',
                listaMovimento: 'lista_qualquer',
                jogo: 'Uid_jogo_qualquer'
            }
        }
        const respostaHttp = await sut.salvarPersonagem(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.body.mensagem).toEqual('falta o parametro: imagem')
    })

    test('retorna 400 se a listaMovimento não for passado', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                nome: 'nome_qualquer',
                sobreNome: 'sobrenome_qualquer',
                imagem: 'imagem_qualquer',
                jogo: 'Uid_jogo_qualquer'
            }
        }
        const respostaHttp = await sut.salvarPersonagem(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.body.mensagem).toEqual('falta o parametro: listaMovimento')
    })

    test('retorna 400 se o jogoUid não for passado', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                nome: 'nome_qualquer',
                sobreNome: 'sobrenome_qualquer',
                imagem: 'imagem_qualquer',
                listaMovimento: 'lista_qualquer',
            }
        }
        const respostaHttp = await sut.salvarPersonagem(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.body.mensagem).toEqual('falta o parametro: jogo')
    })

    // test('Retorna 200 se todos os dados forem passados', async () => {
    //     const { sut } = constroiSut()
    //     const requisicaoHttp = {
    //         body: {
    //             nome: 'nome_valido',
    //             sobreNome: 'sobreNome_valido',
    //             imagem: 'imagem_valida',
    //             listaMovimento: 'listaMovimeto_valido',
    //             jogo: 'uid_valido'
    //         }
    //     }
    //     const respostaHttp = await sut.salvarPersonagem(requisicaoHttp)
    //     const uid = respostaHttp.body.uid
    //     const creatAt = respostaHttp.body.createAt
    //     const updateAt = respostaHttp.body.updateAt
    //     expect(respostaHttp.codigoStatus).toBe(200)
    //     expect(respostaHttp.body).toEqual(
    //     {    
    //         uid: uid,
    //         nome: 'nome_valido',
    //         sobreNome: 'sobreNome_valido',
    //         imagem: 'imagem_valida',
    //         listaMovimento: 'listaMovimeto_valido',
    //         jogo: 'uid_valido',
    //         deleted: false,
    //         createAt: creatAt,
    //         updateAt: updateAt
    //     })
    // })
})