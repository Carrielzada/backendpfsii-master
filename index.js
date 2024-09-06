import express from 'express';
import cors from 'cors';
import rotaTipoMaquinario from './Rotas/rotaTipoMaquinario.js';
import rotaMaquinario from './Rotas/rotaMaquinario.js';

const host='0.0.0.0';
const porta=3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/tipoMaquinario',rotaTipoMaquinario);
app.use('/maquinario',rotaMaquinario);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
