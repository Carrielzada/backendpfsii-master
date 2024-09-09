import Projeto from "../Modelo/projeto.js";
import Operador from "../Modelo/operador.js";
import Maquinario from "../Modelo/Maquinario.js";
import ProjetoMaquinario from "../Modelo/ProjetoMaquinario.js";

export default class ProjetoCtrl {
    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const { operador, data_projeto, total, maquinarios } = dados;
            
            if (operador && operador.codigo && data_projeto && total && Array.isArray(maquinarios) && maquinarios.length > 0) {
                try {
                    const objOperador = new Operador(operador.codigo);
                    const projeto = new Projeto(0, objOperador, new Date(data_projeto), total);
                    
                    // Verificar se todos os maquinários existem antes de prosseguir
                    for (const item of maquinarios) {
                        const objMaquinario = new Maquinario(item.codigo);
                        const maquinarioExiste = await objMaquinario.consultar(item.codigo);
                        if (!maquinarioExiste) {
                            throw new Error(`Maquinário com código ${item.codigo} não encontrado.`);
                        }
                        const projetoMaquinario = new ProjetoMaquinario(0, projeto, objMaquinario, item.quantidade, item.precoUnitario);
                        projeto.adicionarMaquinario(projetoMaquinario);
                    }

                    await projeto.gravar();

                    resposta.status(201).json({
                        status: true,
                        mensagem: "Projeto registrado com sucesso",
                        codigo: projeto.codigo
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao registrar o projeto: " + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Dados incompletos para registrar o projeto"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }   
    }

    async consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo || "";
        
        if (requisicao.method === "GET") {
            try {
                const projeto = new Projeto();
                const listaProjetos = await projeto.consultar(termo);
                resposta.json({
                    status: true,
                    listaProjetos: listaProjetos.map(projeto => ({
                        codigo: projeto.codigo,
                        operador: {
                            codigo: projeto.operador.codigo,
                            nome: projeto.operador.nome
                        },
                        data_projeto: projeto.data_projeto,
                        total: projeto.total,
                        maquinarios: projeto.maquinarios.map(pm => ({
                            codigo: pm.maquinario.codigo,
                            descricao: pm.maquinario.descricao,
                            quantidade: pm.quantidade,
                            precoUnitario: pm.precoUnitario
                        }))
                    }))
                });
            } catch (erro) {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao consultar projetos: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido"
            });
        }
    }
}
