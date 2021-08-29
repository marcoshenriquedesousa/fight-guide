import {createConnection, getConnectionOptions } from "typeorm"

export const criaTypeOemCom = async () => {
    const opcaoDeConexao = await getConnectionOptions(process.env.NODE_ENV)
    return createConnection({...opcaoDeConexao, name: "default"})
}