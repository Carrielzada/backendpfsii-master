import { Router } from 'express';
import ProjetoMaquinarioCtrl from '../Controle/ProjetoMaquinarioCtrl.js';

const pMqCtrl = new ProjetoMaquinarioCtrl();
const rotaProjetoMaquinario = new Router();

rotaProjetoMaquinario
.get('/', pMqCtrl.consultar)
.get('/:termo', pMqCtrl.consultar)
.post('/', pMqCtrl.gravar)
.patch('/', pMqCtrl.atualizar)
.put('/', pMqCtrl.atualizar)
.delete('/', pMqCtrl.excluir);

export default rotaProjetoMaquinario;