import { criaTypeOemCom } from "../../utils/criaTypeOrmCon"
import { PersonagemController } from "./personagem"

beforeAll(async () => {
    await criaTypeOemCom()
})

describe('PersonagemControlador', () => {
    test('retorna 400 se o nome não for passado', async () => {
        const personagem = new PersonagemController()
        const requisicaoHttp = {
            body: {
                sobreNome: 'sobrenome_qualquer',
                imagem: 'imagem_qualquer',
                jogoUid: 'Uid_jogo_qualquer',
                listaMovimento: 'lista_qualquer'
            }
        }
        const respostaHttp =  await personagem.salvarPersonagem(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.body.mensagem).toEqual('falta o parametro: nome')
    })
})