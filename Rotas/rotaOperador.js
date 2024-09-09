import { Router } from "express";
import OperadorCtrl from "../Controle/OperadorCtrl.js";

const opCtrl = new OperadorCtrl();
const rotaOperador = new Router();

rotaOperador
.get('/', opCtrl.consultar)
.get('/cpf/:cpf', opCtrl.consultarPorCPF)
.get('/:termo', opCtrl.consultar)
.post('/', opCtrl.gravar)
.patch('/', opCtrl.atualizar)
.put('/', opCtrl.atualizar)
.delete('/', opCtrl.excluir);

export default rotaOperador;
