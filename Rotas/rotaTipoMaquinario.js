import { Router } from "express";
import TipoMaquinarioCtrl from "../Controle/TipoMaquinarioCtrl.js";

const tpmCtrl = new TipoMaquinarioCtrl();
const rotaTipoMaquinario = new Router();

rotaTipoMaquinario
.get('/',tpmCtrl.consultar)
.get('/:termo', tpmCtrl.consultar)
.post('/',tpmCtrl.gravar)
.patch('/',tpmCtrl.atualizar)
.put('/',tpmCtrl.atualizar)
.delete('/',tpmCtrl.excluir);

export default rotaTipoMaquinario;