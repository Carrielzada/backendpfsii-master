import Projeto from "../Modelo/projeto.js";
import Operador from "../Modelo/operador.js";
import Maquinario from "../Modelo/Maquinario.js";
import ProjetoMaquinario from "../Modelo/ProjetoMaquinario.js";
import conectar from "./Conexao.js";

export default class ProjetoDAO {
    async gravar(projeto) {
        if (projeto instanceof Projeto) {
            const conexao = await conectar();
            try {
                await conexao.beginTransaction();

                const sqlProjeto = "INSERT INTO projeto(operador_codigo, data_projeto, total) VALUES (?, ?, ?)";
                const parametrosProjeto = [projeto.operador.codigo, projeto.data_projeto, projeto.total];
                const [resultadoProjeto] = await conexao.execute(sqlProjeto, parametrosProjeto);
                projeto.codigo = resultadoProjeto.insertId;

                for (const maquinario of projeto.maquinarios) {
                    const sqlProjetoMaquinario = "INSERT INTO projeto_maquinario(projeto_codigo, maquinario_codigo, quantidade, preco_unitario) VALUES (?, ?, ?, ?)";
                    const parametrosProjetoMaquinario = [projeto.codigo, maquinario.maquinario.codigo, maquinario.quantidade, maquinario.precoUnitario];
                    await conexao.execute(sqlProjetoMaquinario, parametrosProjetoMaquinario);
                }

                await conexao.commit();
            } catch (erro) {
                await conexao.rollback();
                throw erro;
            } finally {
                conexao.release();
            }
        }
    }

    async atualizar(projeto) {
        if (projeto instanceof Projeto) {
            const conexao = await conectar();
            try {
                await conexao.beginTransaction();
                const sql = "UPDATE projeto SET operador_codigo = ?, data_projeto = ?, total = ? WHERE codigo = ?";
                const parametros = [projeto.operador.codigo, projeto.data, projeto.total, projeto.codigo];
                await conexao.execute(sql, parametros);

                await conexao.execute("DELETE FROM projeto_maquinario WHERE projeto_codigo = ?", [projeto.codigo]);

                for (const maquinario of projeto.maquinarios) {
                    const sqlMaquinario = "INSERT INTO projeto_maquinario(projeto_codigo, maquinario_codigo, quantidade, preco_unitario) VALUES (?, ?, ?, ?)";
                    const paramsMaquinario = [projeto.codigo, maquinario.maquinario.codigo, maquinario.quantidade, maquinario.precoUnitario];
                    await conexao.execute(sqlMaquinario, paramsMaquinario);
                }

                await conexao.commit();
            } catch (erro) {
                await conexao.rollback();
                throw erro;
            } finally {
                conexao.release();
            }
        }
    }

    async excluir(projeto) {
        if (projeto instanceof Projeto) {
            const conexao = await conectar();
            try {
                await conexao.beginTransaction();
                await conexao.execute("DELETE FROM projeto_maquinario WHERE projeto_codigo = ?", [projeto.codigo]);
                await conexao.execute("DELETE FROM projeto WHERE codigo = ?", [projeto.codigo]);
                await conexao.commit();
            } catch (erro) {
                await conexao.rollback();
                throw erro;
            } finally {
                conexao.release();
            }
        }
    }

    async consultar(termo = '') {
        const conexao = await conectar();
        let listaProjetos = [];
        try {
            const sql = `
                SELECT p.codigo, p.data_projeto, p.total,
                       o.codigo AS operador_codigo, o.nome AS operador_nome,
                       pm.maquinario_codigo, pm.quantidade, pm.preco_unitario,
                       m.mq_descricao AS maquinario_descricao
                FROM projeto p
                INNER JOIN operador o ON p.operador_codigo = o.codigo
                LEFT JOIN projeto_maquinario pm ON p.codigo = pm.projeto_codigo
                LEFT JOIN maquinario m ON pm.maquinario_codigo = m.mq_codigo
                WHERE p.codigo LIKE ? OR o.nome LIKE ?
                ORDER BY p.data_projeto DESC`;
            const [registros] = await conexao.execute(sql, [`%${termo}%`, `%${termo}%`]);
            
            const projetosMap = new Map();

            for (const registro of registros) {
                if (!projetosMap.has(registro.codigo)) {
                    const operador = new Operador(registro.operador_codigo, registro.operador_nome);
                    const projeto = new Projeto(
                        registro.codigo,
                        operador,
                        registro.data_projeto,
                        registro.total
                    );
                    projetosMap.set(registro.codigo, projeto);
                }

                const projeto = projetosMap.get(registro.codigo);
                if (registro.maquinario_codigo) {
                    const maquinario = new Maquinario(registro.maquinario_codigo, registro.maquinario_descricao);
                    const projetoMaquinario = new ProjetoMaquinario(
                        0, // Não temos o código do ProjetoMaquinario, então usamos 0
                        projeto,
                        maquinario,
                        registro.quantidade,
                        registro.preco_unitario
                    );
                    projeto.adicionarMaquinario(projetoMaquinario);
                }
            }

            listaProjetos = Array.from(projetosMap.values());
        } finally {
            conexao.release();
        }
        return listaProjetos;
    }
}