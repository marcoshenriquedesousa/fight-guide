import { criaTypeOemCom } from "../../utils/criaTypeOrmCon"
import { ListaDeMovimentoController } from "./lista-movimento"

describe('ListaDeMovimentosController', () => { 

    beforeAll(async () => {
        await criaTypeOemCom()
    })
    
    let dadosSalvos = {
        uid: '',
        createAt: '',
        updateAt: ''
    }
    
    interface TipoStub {
        sut: ListaDeMovimentoController
    }
    
    const constroiSut = (): TipoStub => {
        const sut = new ListaDeMovimentoController()
        return {
            sut,
        }
    }
  
    test('retorna 400 se a dificuldade não for passado', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                video: 'video_qualquer',
                imagem: 'imagem_qualquer',
                personagemUid: 'Uid_personagem_qualquer'
            }
        }
        const respostaHttp = await sut.SalvarLista(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.body.mensagem).toEqual('falta o parametro: dificuldade')
    })

    test('retorna 400 se a imagem não for passado', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                dificuldade: 'dificuldade_qualquer',
                video: 'video_qualquer',
                personagemUid: 'Uid_personagem_qualquer'
            }
        }
        const respostaHttp = await sut.SalvarLista(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.body.mensagem).toEqual('falta o parametro: imagem')
    })
})