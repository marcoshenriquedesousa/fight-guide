export class BaseControlador {
    salvar(modelo: any): any {
        if(!modelo) {
            return {
              codigoStatus: 400,
              erro: new Error('Modelo invalido')
            }
        }    
    }
}