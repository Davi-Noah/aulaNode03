import { readFile } from 'fs/promises';


export async function carregar(req, res, next) {
    const dados = await readFile('data.json')
    const usuarios = JSON.parse(dados)
    req.usuarios = usuarios
    next()
}