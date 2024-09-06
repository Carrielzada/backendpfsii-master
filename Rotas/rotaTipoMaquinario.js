import { Router } from "express";
import TipoMaquinarioCtrl from "../Controle/TipoMaquinarioCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

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