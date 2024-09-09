import ProjetoMaquinario from "../Modelo/ProjetoMaquinario.js";
import conectar from "./Conexao.js";

export default class ProjetoMaquinarioDAO {
    async gravar(projetoMaquinario) {
        if (projetoMaquinario instanceof ProjetoMaquinario) {
            const conexao = await conectar();
            try {
                const sql = "INSERT INTO projeto_maquinario(projeto_codigo, maquinario_codigo, quantidade, preco_unitario) VALUES (?, ?, ?, ?)";
                const parametros = [projetoMaquinario.projeto.codigo, projetoMaquinario.maquinario.codigo, projetoMaquinario.quantidade, projetoMaquinario.precoUnitario];
                const [resultado] = await conexao.execute(sql, parametros);
                projetoMaquinario.codigo = resultado.insertId;
            } finally {
                conexao.release();
            }
        }
    }

    async atualizar(projetoMaquinario) {
        if (projetoMaquinario instanceof ProjetoMaquinario) {
            const conexao = await conectar();
            try {
                const sql = "UPDATE projeto_maquinario SET quantidade = ?, preco_unitario = ? WHERE codigo = ?";
                const parametros = [projetoMaquinario.quantidade, projetoMaquinario.precoUnitario, projetoMaquinario.codigo];
                await conexao.execute(sql, parametros);
            } finally {
                conexao.release();
            }
        }
    }

    async excluir(projetoMaquinario) {
        if (projetoMaquinario instanceof ProjetoMaquinario) {
            const conexao = await conectar();
            try {
                const sql = "DELETE FROM projeto_maquinario WHERE codigo = ?";
                const parametros = [projetoMaquinario.codigo];
                await conexao.execute(sql, parametros);
            } finally {
                conexao.release();
            }
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let listaProjetoMaquinarios = [];
        try {
            const sql = `
                SELECT pm.projeto_codigo, pm.maquinario_codigo, pm.quantidade, pm.preco_unitario,
                       p.data_projeto, p.total,
                       m.mq_descricao AS maquinario_descricao
                FROM projeto_maquinario pm
                INNER JOIN projeto p ON p.codigo = pm.projeto_codigo
                INNER JOIN maquinario m ON m.mq_codigo = pm.maquinario_codigo
                WHERE pm.projeto_codigo LIKE ? OR pm.maquinario_codigo LIKE ? OR m.mq_descricao LIKE ?
                ORDER BY p.data_projeto DESC, pm.projeto_codigo`;
            const [registros] = await conexao.execute(sql, [`%${termo}%`, `%${termo}%`, `%${termo}%`]);
            for (const registro of registros) {
                const projetoMaquinario = new ProjetoMaquinario(
                    registro.projeto_codigo,
                    registro.maquinario_codigo,
                    registro.quantidade,
                    registro.preco_unitario
                );
                listaProjetoMaquinarios.push(projetoMaquinario);
            }
        } finally {
            conexao.release();
        }
        return listaProjetoMaquinarios;
    }
}