import { Router } from "express";
import MaquinarioCtrl from "../Controle/MaquinarioCtrl.js";

const mqCtrl = new MaquinarioCtrl();
const rotaMaquinario = new Router();

rotaMaquinario
.get('/', mqCtrl.consultar)
.get('/:termo', mqCtrl.consultar)
.post('/', mqCtrl.gravar)
.patch('/', mqCtrl.atualizar)
.put('/', mqCtrl.atualizar)
.delete('/', mqCtrl.excluir);

export default rotaMaquinario;