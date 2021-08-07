export class BaseControlador {
    salvar(modelo: any): any {
        if(!modelo) {
            return {
              status: 400
            }
        }    
    }
}