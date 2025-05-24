import express from 'express';
import { readFile, writeFile } from 'fs/promises';

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Oi');

    res.end();
});

app.post('/adicionar_usuario', async (req, res) => {
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

app.listen(3333);