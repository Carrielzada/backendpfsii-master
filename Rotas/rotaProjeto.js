import { Router } from 'express';
import ProjetoCtrl from '../Controle/ProjetoCtrl.js';

const pCtrl = new ProjetoCtrl();
const rotaProjeto = new Router();

rotaProjeto
.get('/', pCtrl.consultar)
.get('/:termo', pCtrl.consultar)
.post('/', pCtrl.gravar)

export default rotaProjeto;
