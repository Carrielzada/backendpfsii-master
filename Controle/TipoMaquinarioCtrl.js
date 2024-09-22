//camada de interface da API que traduz HTTP
import TipoMaquinario from "../Modelo/TipoMaquinario.js";

export default class TipoMaquinarioCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const descricao = dados.descricao;
            if (descricao) {
                const tipoMaquinario = new TipoMaquinario(0, descricao);
                //resolver a promise
                tipoMaquinario.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Tipo de Maquinário cadastrado com sucesso!", // Mensagem de sucesso
                        "listaTipoMaquinario": [{
                            "codigo": tipoMaquinario.codigo,
                            "descricao": tipoMaquinario.descricao
                        }]
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o tipo de maquinário: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe a descrição do tipo de maquinario!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um tipo de maquinario!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const descricao = dados.descricao;
            if (codigo && descricao) {
                const tipoMaquinario = new TipoMaquinario(codigo, descricao);
                //resolver a promise
                tipoMaquinario.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Tipo de maquinario atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o tipo de maquinario:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código e a descrição do tipo de maquinario!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um tipo de maquinario!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo; // Certifique-se de que o código está sendo passado corretamente
            if (codigo) {
                const tipoMaquinario = new TipoMaquinario(codigo); // Instanciar corretamente o objeto
                tipoMaquinario.possuiMaquinario().then(possuiMaquinario => {
                    if (!possuiMaquinario) {
                        tipoMaquinario.excluir().then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Tipo de maquinario excluído com sucesso!"
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Erro ao excluir o tipo de maquinario: " + erro.message
                            });
                        });
                    } else {
                        resposta.status(400).json({
                            "status": false,
                            "mensagem": "Não é possível excluir o tipo de maquinario, pois existem maquinários associados!"
                        });
                    }
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao verificar se o tipo de maquinario possui maquinários associados: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do tipo de maquinario!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um tipo de maquinario!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const tipoMaquinario = new TipoMaquinario();
            tipoMaquinario.consultar(termo).then((listaTipoMaquinario)=>{
                resposta.json(
                    {
                        status: true,
                        listaTipoMaquinario: listaTipoMaquinario.map(tipo => ({
                            codigo: tipo.codigo,
                            descricao: tipo.descricao
                        }))
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status: false,
                        mensagem: "Não foi possível obter os tipos de maquinario: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar tipos de maquinario!"
            });
        }
    }
}