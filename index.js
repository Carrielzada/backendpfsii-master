import express from 'express';
import cors from 'cors';
import rotaTipoMaquinario from './Rotas/rotaTipoMaquinario.js';
import rotaMaquinario from './Rotas/rotaMaquinario.js';
import session from 'express-session';
import dotenv from 'dotenv';
import rotaAutenticacao from './Rotas/rotaAutenticacao.js';
import rotaOperador from './Rotas/rotaOperador.js';
import rotaProjeto from './Rotas/rotaProjeto.js';
import rotaProjetoMaquinario from './Rotas/rotaProjetoMaquinario.js';
import { verificarAutenticacao } from './Seguranca/autenticar.js';
dotenv.config(); // carregar as variáveis de ambiente extraindo elas do arquivo .env


const host='0.0.0.0';
const porta=4000;

const app = express();

app.use(session({
    secret: process.env.CHAVE_SECRETA,
    resave: true, //a cada req a sessão precisa ser atualizada
    saveUninitialized: true, //salvar sessões não iniciadas
    cookie: { 
        httpOnly: false,
        secure: false,
        sameSite: false,
        maxAge: 1000 * 60 * 30} 
}));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
                          //middleware
app.use('/tipoMaquinario', /*verificarAutenticacao, */rotaTipoMaquinario);
app.use('/maquinario',/* verificarAutenticacao, */rotaMaquinario);
app.use('/autenticacao', rotaAutenticacao);
app.use('/operador', verificarAutenticacao, rotaOperador);
app.use('/projeto', verificarAutenticacao, rotaProjeto);
app.use('/projetoMaquinario', verificarAutenticacao, rotaProjetoMaquinario);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})