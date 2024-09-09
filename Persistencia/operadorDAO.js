import Operador from '../Modelo/operador.js';
import conectar from './Conexao.js';

export default class OperadorDAO{

    async incluir(operador){
        if (operador instanceof Operador){
            const conexao = await conectar();
            const sql = "INSERT INTO operador (nome, cpf, telefone, endereco) VALUES (?, ?, ?, ?)";
            const valores = [operador.nome, operador.cpf, operador.telefone, operador.endereco];
            const [resultado] = await conexao.query(sql, valores);
            return resultado.insertId; // Retorna o ID do operador inserido
        }
    }

    async alterar(operador){
     
        if (operador instanceof Operador){
            const conexao=await conectar();
            const sql = "UPDATE operador SET nome=?, cpf=?, telefone=?, endereco=? WHERE cpf=?";
            const valores = [operador.nome, operador.cpf, operador.telefone, operador.endereco, operador.codigo];
            await conexao.query(sql, valores);
        }
    }
    async excluir(operador){
        if (operador instanceof Operador){
            const conexao=await conectar();
            const sql = "DELETE FROM operador WHERE cpf=?";
            const valores = [operador.cpf];
            await conexao.query(sql, valores);
        }
    }
    async consultar(termo = '') {
        const conexao = await conectar();
        const sql = "SELECT * FROM operador WHERE nome LIKE ? OR cpf LIKE ?";
        const valores = [`%${termo}%`, `%${termo}%`];
        const [rows] = await conexao.query(sql, valores);
        const listaOperadores = [];
        for (const row of rows) {
            const operador = new Operador(row.codigo, row.nome, row.cpf, row.telefone, row.endereco);
            listaOperadores.push(operador);
        }
        return listaOperadores;
    }

    async consultarCPF(cpf) {
        const conexao = await conectar();
        const sql = "SELECT * FROM operador WHERE cpf = ?";
        const valores = [cpf];
        const [rows] = await conexao.query(sql, valores);
        const listaOperadores = [];
        for (const row of rows) {
            const operador = new Operador(row.codigo, row.nome, row.cpf, row.telefone, row.endereco);
            listaOperadores.push(operador);
        }
        return listaOperadores;
    }

}