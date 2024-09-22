import Maquinario from '../Modelo/Maquinario.js';
import TipoMaquinario from '../Modelo/TipoMaquinario.js';
import conectar from './conexao.js';

export default class MaquinarioDAO {

    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS maquinario(
                mq_codigo INT NOT NULL AUTO_INCREMENT,
                mq_descricao VARCHAR(100) NOT NULL,
                mq_precoCusto DECIMAL(10,2) NOT NULL DEFAULT 0,
                mq_precoVenda DECIMAL(10,2) NOT NULL DEFAULT 0,
                mq_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
                mq_tipoMaquinario INT NOT NULL,
                CONSTRAINT pk_maquinario PRIMARY KEY(mq_codigo),
                CONSTRAINT fk_maquinario_tipoMaquinario FOREIGN KEY (mq_tipoMaquinario)
                REFERENCES tipoMaquinario(tpm_codigo)
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }


    async gravar(maquinario) {
        if (maquinario instanceof Maquinario) {
            const sql = `INSERT INTO maquinario(mq_descricao, mq_precoCusto, 
                         mq_precoVenda, mq_qtdEstoque, mq_tipoMaquinario) 
                         VALUES(?, ?, ?, ?, ?)`;
            const parametros = [maquinario.descricao, maquinario.precoCusto,
                                maquinario.precoVenda, maquinario.qtdEstoque,
                                maquinario.tipoMaquinario.codigo];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            maquinario.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(maquinario) {
        if (maquinario instanceof Maquinario) {
            const sql = `UPDATE maquinario SET mq_descricao = ?, mq_precoCusto = ?,
            mq_precoVenda = ?, mq_qtdEstoque = ?, mq_tipoMaquinario = ?
            WHERE mq_codigo = ?`;
            const parametros = [maquinario.descricao, maquinario.precoCusto,
                                maquinario.precoVenda, maquinario.qtdEstoque,
                                maquinario.tipoMaquinario.codigo, maquinario.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(maquinario) {
        if (maquinario instanceof Maquinario) {
            const sql = `DELETE FROM maquinario WHERE mq_codigo = ?`;
            const parametros = [maquinario.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo){
            termo="";
        }
        const conexao = await conectar();
        let listaMaquinarios = [];
        if (!isNaN(parseInt(termo))){
            const sql = `SELECT mq.mq_codigo, mq.mq_descricao, mq.mq_precoCusto, 
                         mq.mq_precoVenda, mq.mq_qtdEstoque, mq.mq_tipoMaquinario,
                         tpm.tpm_codigo, tpm.tpm_descricao
                         FROM maquinario mq 
                         INNER JOIN tipo_maquinario tpm ON mq.mq_tipoMaquinario = tpm.tpm_codigo
                         WHERE mq.mq_codigo = ?
                         ORDER BY mq.mq_descricao               
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const tipoMaquinario = new TipoMaquinario(registro.tpm_codigo, registro.tpm_descricao);
                const maquinario = new Maquinario(registro.mq_codigo,registro.mq_descricao,
                                        registro.mq_precoCusto,registro.mq_precoVenda,
                                        registro.mq_qtdEstoque, tipoMaquinario);
                listaMaquinarios.push(maquinario);
            }
        }
        else
        {
            const sql = `SELECT mq.mq_codigo, mq.mq_descricao, mq.mq_precoCusto, 
                         mq.mq_precoVenda, mq.mq_qtdEstoque, mq.mq_tipoMaquinario,
                         tpm.tpm_codigo, tpm.tpm_descricao
                         FROM maquinario mq 
                         INNER JOIN tipo_maquinario tpm ON mq.mq_tipoMaquinario = tpm.tpm_codigo
                         WHERE mq.mq_descricao like ?
                         ORDER BY mq.mq_descricao`;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const tipoMaquinario = new TipoMaquinario(registro.tpm_codigo, registro.tpm_descricao);
                const maquinario = new Maquinario(registro.mq_codigo,registro.mq_descricao,
                                            registro.mq_precoCusto,registro.mq_precoVenda,
                                            registro.mq_qtdEstoque, tipoMaquinario);
                listaMaquinarios.push(maquinario);
            }
        }

        global.poolConexoes.releaseConnection(conexao);
        return listaMaquinarios;
    }
}