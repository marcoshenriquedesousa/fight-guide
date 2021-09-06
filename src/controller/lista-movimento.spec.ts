import { criaTypeOemCom } from "../../utils/criaTypeOrmCon"
import { JogoController } from "./jogo"
import { ListaDeMovimentoController } from "./lista-movimento"
import { PersonagemController } from "./personagem"

describe('ListaDeMovimentosController', () => { 

    beforeAll(async () => {
        await criaTypeOemCom()
    })
    
    let dadosSalvos = {
        uid: '',
        uidJogo: '',
        uidPersonagem: '',
        createAt: '',
        updateAt: ''
    }
    
    interface TipoStub {
        sut: ListaDeMovimentoController,
        jogo: JogoController,
        personagem: PersonagemController
    }
    
    const constroiSut = (): TipoStub => {
        const sut = new ListaDeMovimentoController()
        const jogo = new JogoController()
        const personagem = new PersonagemController()
        return {
            sut,
            jogo,
            personagem
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

    test('retorna 400 se a video não for passado', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                dificuldade: 'dificuldade_qualquer',
                imagem: 'imagem_qualquer',
                personagemUid: 'Uid_personagem_qualquer'
            }
        }
        const respostaHttp = await sut.SalvarLista(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.body.mensagem).toEqual('falta o parametro: video')
    })

    test('retorna 400 se a personagem não for passado', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                dificuldade: 'dificuldade_qualquer',
                imagem: 'imagem_qualquer',
                video: 'video_qualquer',
            }
        }
        const respostaHttp = await sut.SalvarLista(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(400)
        expect(respostaHttp.body.mensagem).toEqual('falta o parametro: personagem')
    })

    test('Salvar um jogo para gerar um uid valido', async () => {
        const { jogo } = constroiSut()
        const requisicaoHttp = {
            body: {
                titulo: 'titulo_valido',
                imagem: 'imagem_valida'
            }
        }
        const respostaHttp = await jogo.salvarJogo(requisicaoHttp)
        dadosSalvos.uidJogo = respostaHttp.body.uid
        const createAt = respostaHttp.body.createAt
        const updateAt = respostaHttp.body.updateAt
        expect(respostaHttp.codigoStatus).toBe(200)
        expect(respostaHttp.body).toEqual({
            uid: dadosSalvos.uidJogo,
            titulo: 'titulo_valido',
            imagem: 'imagem_valida',
            deleted: false,
            createAt: createAt,
            updateAt: updateAt
        })
    })

    test('Salvar um personagem para gerar um uid valido', async () => {
        const { personagem } = constroiSut()
        const requisicaoHttp = {
            body: {
                nome: 'nome_valido',
                sobreNome: 'sobreNome_valido',
                imagem: 'imagem_valida',
                listaMovimento: 'listaMovimeto_valido',
                jogo: dadosSalvos.uidJogo
            }
        }
        const respostaHttp = await personagem.salvarPersonagem(requisicaoHttp)
        dadosSalvos.uidPersonagem = respostaHttp.body.uid 
        const creatAt = respostaHttp.body.createAt
        const updateAt = respostaHttp.body.updateAt
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
            createAt: creatAt,
            updateAt: updateAt
        })
    })

    test('Retorna 200 se todos os dados forem passados', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                dificuldade: 'dificuldade_valido',
                video: 'video_valida',
                imagem: 'imagem_valida',
                personagem: dadosSalvos.uidPersonagem,
            }
        }
        const respostaHttp = await sut.SalvarLista(requisicaoHttp)
        dadosSalvos.uid = respostaHttp.body.uid
        const createAt = respostaHttp.body.createAt
        const updateAt = respostaHttp.body.updateAt
        expect(respostaHttp.codigoStatus).toBe(200)
        expect(respostaHttp.body).toEqual({
            uid: dadosSalvos.uid,
            dificuldade: 'dificuldade_valido',
            video: 'video_valida',
            imagem: 'imagem_valida',
            personagem: dadosSalvos.uidPersonagem,
            deleted: false,
            createAt: createAt,
            updateAt: updateAt
        })
    })

    test('Retorna 200 se retorna todos os dados da consulta', async () => {
        const { sut } = constroiSut()
        const respostaHttp = await sut.todos()
        expect(respostaHttp.codigoStatus).toBe(200)
        expect(respostaHttp.body).toHaveLength(1)
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
        expect(respostaHttp.body).toEqual('Obejeto não encontrado')
    })

    test('Retorna 404 se o uid não for encontrado no update', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                uid: 'uid_invalido',
                dificuldade: 'dificuldade_invalido'
            }
        }
        const respostaHttp = await sut.salvar(requisicaoHttp.body)
        expect(respostaHttp.codigoStatus).toBe(404)
        expect(respostaHttp.body).toEqual('uid não encontrado')
    })

    test('Retorna 200 se o uid for encontrado no update', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            body: {
                uid: dadosSalvos.uid,
                dificuldade: 'dificuldade_editado'
            }
        }
        const respostaHttp = await sut.salvar(requisicaoHttp.body)
        const updateAt = respostaHttp.body.updateAt
        expect(respostaHttp.codigoStatus).toBe(200)
        expect(respostaHttp.body).toEqual({
            uid: dadosSalvos.uid,
            dificuldade: 'dificuldade_editado',
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
        expect(respostaHttp.body).toEqual('uid não encontrado')
    })

    test('Retorna 200 se o uid for encontrado na exclusão', async () => {
        const { sut } = constroiSut()
        const requisicaoHttp = {
            params: {
                id: dadosSalvos.uid,
            }
        }
        const respostaHttp = await sut.excluir(requisicaoHttp)
        expect(respostaHttp.codigoStatus).toBe(200)
        expect(respostaHttp.body).toEqual('item excluido com sucesso')
    })

    test('Retorna 404 se não retorna dados da consulta', async () => {
        const { sut } = constroiSut()
        const respostaHttp = await sut.todos()
        expect(respostaHttp.codigoStatus).toBe(404)
        expect(respostaHttp.body).toEqual('Lista vazia')
    })
})