import express from 'express';
import cors from 'cors';
import rotaTipoMaquinario from './Rotas/rotaTipoMaquinario.js';
import rotaMaquinario from './Rotas/rotaMaquinario.js';
import session from 'express-session';
import dotenv from 'dotenv';
import rotaAutenticacao from './Rotas/rotaAutenticacao.js';
import { verificarAutenticacao } from './Seguranca/autenticar.js';
dotenv.config(); // carregar as variáveis de ambiente extraindo elas do arquivo .env


const host='0.0.0.0';
const porta=3000;

const app = express();

app.use(session({
    secret: process.env.CHAVE_SECRETA,
    resave: false, //a cada req a sessão precisa ser atualizada
    saveUninitialized: true, //salvar sessões não iniciadas
    cookie: { maxAge: 1000 * 60 * 30} //tempo máximo de ociosidade para considerar a sessão vencida.
}));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
                          //middleware
app.use('/tipoMaquinario',verificarAutenticacao,rotaTipoMaquinario);
app.use('/maquinario',verificarAutenticacao,rotaMaquinario);
app.use('/autenticacao',rotaAutenticacao);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
