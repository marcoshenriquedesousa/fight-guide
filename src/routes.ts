import {JogoController} from "./controller/jogo";
import { ListaDeMovimentoController } from "./controller/lista-movimento";
import { PersonagemController } from "./controller/personagem";

export const Routes = [
    { method: "get", route: "/jogo", controller: JogoController, action: "todos" }, 
    { method: "get", route: "/jogo/:id", controller: JogoController, action: "retornaUm" }, 
    { method: "post", route: "/jogo/criar", controller: JogoController, action: "salvarJogo" }, 
    { method: "delete", route: "/jogo/:id", controller: JogoController, action: "excluir" },

    { method: "get", route: "/personagem", controller: PersonagemController, action: "todos" }, 
    { method: "get", route: "/personagem/:id", controller: PersonagemController, action: "retornaUm" }, 
    { method: "post", route: "/personagem/criar", controller: PersonagemController, action: "salvarPersonagem" }, 
    { method: "delete", route: "/personagem/:id", controller: PersonagemController, action: "excluir" },

    { method: "get", route: "/listaMovimento", controller: ListaDeMovimentoController, action: "todos" }, 
    { method: "get", route: "/listaMovimento/:id", controller: ListaDeMovimentoController, action: "retornaUm" }, 
    { method: "post", route: "/listaMovimento/criar", controller: ListaDeMovimentoController, action: "salvarLista" }, 
    { method: "delete", route: "/listaMovimento/:id", controller: ListaDeMovimentoController, action: "excluir" }
];