import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import { carregar } from './middlewares/carregarJson'

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post('/adicionar_usuario', carregar, async (req, res) => {
    const { email, senha } = req.body

    const dados = await readFile('data.json')

    const usuarios = JSON.parse(dados)

    if(usuarios.find(u  => u.email === email)){
        return res.status(400).json({erro: 'Email já cadastrado'})
    }

    usuarios.push({ email, senha })

    await writeFile('data.json', JSON.stringify(usuarios));

    res.status(201).json({ mensagem: 'Usuário criado com sucesso!' })
});


app.get('/usuarios',carregar,  async (req, res) => {
    const dados = await readFile('data.json')

    const usuarios = JSON.parse(dados)

    res.json(usuarios)
})


app.delete('/deletar_usuario',carregar,  async (req, res) => {
    const { email } = req.body

    const dados = await readFile('data.json')

    const usuarios = JSON.parse(dados)

    const novos_usuarios = usuarios.filter(u => u.email !== email)
    await writeFile('data.json', JSON.stringify(novos_usuarios))
    
    res.status(201).json({ mensagem: 'Usuário deletado com sucesso!' })
})

app.listen(3333);