import {JogoController} from "./controller/jogo";
import { PersonagemController } from "./controller/personagem";

export const Routes = [
    { method: "get", route: "/users", controller: JogoController, action: "all" }, 
    { method: "get", route: "/users/:id", controller: JogoController, action: "one" }, 
    { method: "post", route: "/jogo/criar", controller: JogoController, action: "salvarJogo" }, 
    { method: "delete", route: "/users/:id", controller: JogoController, action: "remove" },

    { method: "get", route: "/users", controller: PersonagemController, action: "all" }, 
    { method: "get", route: "/users/:id", controller: PersonagemController, action: "one" }, 
    { method: "post", route: "/personagem/criar", controller: PersonagemController, action: "salvarPersonagem" }, 
    { method: "delete", route: "/users/:id", controller: PersonagemController, action: "remove" }
];