import { criaTypeOemCom } from "../../utils/criaTypeOrmCon"
import { JogoController } from "./jogo"
import { PersonagemController } from "./personagem"

beforeAll(async () => {
    await criaTypeOemCom()
})

let dadosSalvos = {
    uidJogo: '',
    uidPersonagem: '',
    creatAt: '',
    updateAt: ''
}
interface TipoStub {
    sut: PersonagemController,
    sutJogo: JogoController
}

const constroiSut = (): TipoStub => {
    const sut = new PersonagemController()
    const sutJogo = new JogoController()
    return {
        sut,
        sutJogo
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

    test('Cria jogo para gerar um uid valido', async () => {
        const { sutJogo } = constroiSut()
        const requisicaoHttp = {
            body: {
                titulo: 'titulo_valido',
                imagem: 'imagem_valida'
            }
        }
        const respostaHttp = await sutJogo.salvarJogo(requisicaoHttp)
        dadosSalvos.uidJogo = respostaHttp.body.uid
        const creatAt = respostaHttp.body.createAt
        const updateAt = respostaHttp.body.updateAt
        expect(respostaHttp.codigoStatus).toBe(200)
        expect(respostaHttp.body).toEqual({
            uid: dadosSalvos.uidJogo,
            titulo: 'titulo_valido',
            imagem: 'imagem_valida',
            deleted: false,
            createAt: creatAt,
            updateAt: updateAt
        })
    })

    test('Retorna 200 se todos os dados forem passados', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                nome: 'nome_valido',
                sobreNome: 'sobreNome_valido',
                imagem: 'imagem_valida',
                listaMovimento: 'listaMovimeto_valido',
                jogo: dadosSalvos.uidJogo
            }
        }
        const respostaHttp = await sut.salvarPersonagem(requisicaoHttp)
        dadosSalvos.uidPersonagem = respostaHttp.body.uid 
        dadosSalvos.creatAt = respostaHttp.body.createAt
        dadosSalvos.updateAt = respostaHttp.body.updateAt
        expect(respostaHttp.codigoStatus).toBe(200)
        expect(respostaHttp.body).toEqual(
        {    
            uid: dadosSalvos.uidPersonagem,
            nome: 'nome_valido',
            sobreNome: 'sobreNome_valido',
            imagem: 'imagem_valida',
            listaMovimento: 'listaMovimeto_valido',
            jogo: dadosSalvos.uidJogo,
            deleted: false,
            createAt: dadosSalvos.creatAt,
            updateAt: dadosSalvos.updateAt
        })
    })

    test('Retorna 200 se retorna todos os dados da consulta', async () => {
        const { sut } = constroiSut()
        const respostaHttp = await sut.todos()
        expect(respostaHttp.codigoStatus).toBe(200)
        expect(respostaHttp.body).toHaveLength(1)
    })

    test('Retorna 200 se retorna dado da consulta', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            params: {
                id: dadosSalvos.uidPersonagem, 
            }
        }
        const respostaHttp = await sut.retornaUm(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(200)
        expect(respostaHttp.body).not.toBeNull()
    })

    test('Retorna 404 se não retorna o dado da consulta', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            params: {
                id: 'Uid_invalido', 
            }
        }
        const respostaHttp = await sut.retornaUm(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(404)
        expect(respostaHttp.mensagem).toEqual('Obejeto não encontrado')
    })

    test('Retorna 200 se o uid for encontrado no update', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                uid: dadosSalvos.uidPersonagem,
                nome: 'nome_editado'
            }
        }
        const respostaHttp = await sut.salvar(requisicaoHttp.body)
        const updateAt = respostaHttp.body.updateAt
        expect(respostaHttp.codigoStatus).toBe(200)
        expect(respostaHttp.body).toEqual({
            uid: dadosSalvos.uidPersonagem,
            nome: 'nome_editado',
            updateAt: updateAt
        })
    })

    test('Retorna 404 se o uid não for encontrado na exclusão', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            params: {
                id: "Uid_invalido",
            }
        }
        const respostaHttp = await sut.excluir(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(404)
        expect(respostaHttp.mensagem).toEqual('uid não encontrado')
    })

    test('Retorna 200 se o uid for encontrado na exclusão', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            params: {
                id: dadosSalvos.uidPersonagem,
            }
        }
        const respostaHttp = await sut.excluir(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(200)
        expect(respostaHttp.mensagem).toEqual('item excluido com sucesso')
    })
    
    test('Retorna 404 se não retorna dados da consulta', async () => {
        const { sut } = constroiSut()
        const respostaHttp = await sut.todos()
        expect(respostaHttp.codigoStatus).toBe(404)
        expect(respostaHttp.mensagem).toEqual('Lista vazia')
    })
})