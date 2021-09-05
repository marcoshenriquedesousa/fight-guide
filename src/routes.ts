import {JogoController} from "./controller/jogo";
import { PersonagemController } from "./controller/personagem";

export const Routes = [
    { method: "get", route: "/jogo", controller: JogoController, action: "todos" }, 
    { method: "get", route: "/jogo/:id", controller: JogoController, action: "retornaUm" }, 
    { method: "post", route: "/jogo/criar", controller: JogoController, action: "salvarJogo" }, 
    { method: "delete", route: "/jogo/:id", controller: JogoController, action: "excluir" },

    { method: "get", route: "/personagem", controller: PersonagemController, action: "todos" }, 
    { method: "get", route: "/personagem/:id", controller: PersonagemController, action: "retornaUm" }, 
    { method: "post", route: "/personagem/criar", controller: PersonagemController, action: "salvarPersonagem" }, 
    { method: "delete", route: "/personagem/:id", controller: PersonagemController, action: "excluir" }
];