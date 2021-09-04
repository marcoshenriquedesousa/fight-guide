import {JogoController} from "./controller/jogo";

export const Routes = [
    { method: "get", route: "/users", controller: JogoController, action: "all" }, 
    { method: "get", route: "/users/:id", controller: JogoController, action: "one" }, 
    { method: "post", route: "/jogo/criar", controller: JogoController, action: "salvarJogo" }, 
    { method: "delete", route: "/users/:id", controller: JogoController, action: "remove" }
];