import ProjetoMaquinario from "../Modelo/ProjetoMaquinario.js";
import Operador from "../Modelo/operador.js";
import Maquinario from "../Modelo/Maquinario.js";
import TipoMaquinario from "../Modelo/TipoMaquinario.js";

export default class ProjetoMaquinarioCtrl {

	async gravar(requisicao, resposta) {
		resposta.type('application/json');
		if (requisicao.method === 'POST' && requisicao.is('application/json')) {
			const dados = requisicao.body;
			const { projeto_codigo, maquinario_codigo, quantidade, preco_unitario } = dados;
			if (projeto_codigo && maquinario_codigo && quantidade && preco_unitario) {
				try {
					const projetoMaquinario = new ProjetoMaquinario(0, projeto_codigo, maquinario_codigo, quantidade, preco_unitario);
					await projetoMaquinario.gravar();
					resposta.status(201).json({
						status: true,
						mensagem: "Projeto Maquinário registrado com sucesso"
					});
				} catch (erro) {
					resposta.status(500).json({
						status: false,
						mensagem: "Erro ao registrar o projeto maquinário: " + erro.message
					});
				}
			} else {
				resposta.status(400).json({
					status: false,
					mensagem: "Por favor, informe todos os dados necessários do projeto maquinário!"
				});
			}
		} else {
			resposta.status(405).json({
				status: false,
				mensagem: "Método não permitido ou formato inválido!"
			});
		}
	}

	async atualizar(requisicao, resposta) {
		resposta.type('application/json');
		if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
			const dados = requisicao.body;
			const codigo = dados.codigo;
			const descricao = dados.descricao;
			if (codigo && descricao) {
				try {
					const projetoMaquinario = new ProjetoMaquinario(codigo, descricao);
					await projetoMaquinario.atualizar();
					resposta.status(200).json({
						"status": true,
						"mensagem": "Projeto maquinário atualizado com sucesso!"
					});
				} catch (erro) {
					resposta.status(500).json({
						"status": false,
						"mensagem": "Erro ao atualizar o projeto maquinário:" + erro.message
					});
				}
			} else {
				resposta.status(400).json({
					"status": false,
					"mensagem": "Por favor, informe o código e a descrição do projeto maquinário!"
				});
			}
		} else {
			resposta.status(400).json({
				"status": false,
				"mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um projeto maquinário!"
			});
		}
	}

	async excluir(requisicao, resposta) {
		resposta.type('application/json');
		if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
			const dados = requisicao.body;
			const codigo = dados.codigo;
			if (codigo) {
				try {
					const projetoMaquinario = new ProjetoMaquinario(codigo);
					const possuiMaquinario = await projetoMaquinario.possuiMaquinario();
					if (!possuiMaquinario) {
						await projetoMaquinario.excluir();
						resposta.status(200).json({
							"status": true,
							"mensagem": "Projeto maquinário excluído com sucesso!"
						});
					} else {
						resposta.status(400).json({
							"status": false,
							"mensagem": "Não é possível excluir o projeto maquinário, pois existem maquinários associados!"
						});
					}
				} catch (erro) {
					resposta.status(500).json({
						"status": false,
						"mensagem": "Erro ao excluir o projeto maquinário:" + erro.message
					});
				}
			} else {
				resposta.status(400).json({
					"status": false,
					"mensagem": "Por favor, informe o código do projeto maquinário!"
				});
			}
		} else {
			resposta.status(400).json({
				"status": false,
				"mensagem": "Por favor, utilize o método DELETE para excluir um projeto maquinário!"
			});
		}
	}

	async consultar(requisicao, resposta) {
		resposta.type('application/json');
		let termo = requisicao.params.termo;
		if (!termo) {
			termo = "";
		}
		if (requisicao.method === "GET") {
			try {
				const projetoMaquinario = new ProjetoMaquinario();
				const listaProjetos = await projetoMaquinario.consultar(termo);
				
				const projetosDetalhados = await Promise.all(listaProjetos.map(async (projeto) => {
					const operador = new Operador();
					const dadosOperador = await operador.consultar(projeto.operador_codigo);
					
					const maquinario = new Maquinario();
					const maquinariosProjeto = await maquinario.consultar(projeto.codigo);
					
					const maquinariosDetalhados = await Promise.all(maquinariosProjeto.map(async (maq) => {
						const tipoMaquinario = new TipoMaquinario();
						const dadosTipoMaquinario = await tipoMaquinario.consultar(maq.mq_tipoMaquinario);
						
						return {
							codigo: maq.codigo,
							descricao: maq.mq_descricao,
							precoVenda: maq.mq_precoVenda,
							qtdEstoque: maq.mq_qtdEstoque,
							tipoMaquinario: {
								codigo: dadosTipoMaquinario.codigo,
								descricao: dadosTipoMaquinario.descricao
							},
							quantidade: maq.quantidade,
							precoUnitario: maq.precoUnitario
						};
					}));
					
					return {
						codigo: projeto.codigo,
						dataProjeto: projeto.dataProjeto,
						totalPedido: projeto.totalPedido,
						operador: dadosOperador ? {
							codigo: dadosOperador.codigo,
							nome: dadosOperador.nome,
							// Adicione outros campos do operador que você queira mostrar
						} : null,
						maquinarios: maquinariosDetalhados
					};
				}));

				resposta.json({
					status: true,
					projetos: projetosDetalhados
				});
			} catch (erro) {
				resposta.status(500).json({
					status: false,
					mensagem: "Não foi possível obter os projetos: " + erro.message
				});
			}
		} else {
			resposta.status(400).json({
				"status": false,
				"mensagem": "Por favor, utilize o método GET para consultar projetos!"
			});
		}
	}

	async buscarOperador(operadorCodigo) {
		// Implemente a lógica para buscar os detalhes do operador
		// Retorne um objeto com código e nome do operador
	}

	async buscarMaquinariosDoProjeto(projetoCodigo) {
		// Implemente a lógica para buscar os maquinários associados ao projeto
		// Retorne um array de objetos com detalhes dos maquinários
	}
}