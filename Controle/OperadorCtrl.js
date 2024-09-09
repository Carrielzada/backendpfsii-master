import Operador from "../Modelo/operador.js";

export default class OperadorCtrl{

    gravar(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const telefone = dados.telefone;
            const endereco = dados.endereco;
            if(cpf && nome && telefone && endereco){
                const operador = new Operador(0, nome, cpf, telefone, endereco);
                operador.gravar().then((id) => {
                    resposta.status(201).json({
                        status: true,
                        mensagem: "Operador gravado com sucesso!",
                        id: id
                    });
                }).catch(erro => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao gravar operador: " + erro.message
                    });
                });
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados de um operador!"
                });
            }
        }
        else {
            resposta.status(405).json({
                status: false,
                mensagem: "Método não permitido ou operador no formato inválido!"
            });
        }
    }
    atualizar(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "PUT" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const telefone = dados.telefone;
            const endereco = dados.endereco;
            if(cpf && nome && telefone && endereco)
                {
                const operador = new Operador(0, nome, cpf, telefone, endereco);
                operador.atualizar().then(()=>{
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Operador atualizado com sucesso!"
                    });
                }).catch(erro =>{
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao atualizar operador: " + erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados de um operador!"
                });
            }
        }
        else{
            resposta.status(405).json({
                status: false,
                mensagem: "Método não permitido ou operador no formato inválido!"
            });
        }
    }
    excluir(requisicao, resposta){
        resposta.type('application/json');
        if(requisicao.method === "DELETE" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            if(cpf){
                const operador = new Operador(0, nome, cpf, telefone, endereco);
                operador.excluir().then(()=>{
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Operador excluído com sucesso!"
                    });
                }).catch(erro =>{
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao excluir operador: " + erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o CPF do operador que deseja excluir!"
                });
            }
        }
    }

    async consultar(requisicao, resposta) {
        resposta.type('application/json');
        const termo = requisicao.params.termo || '';

        try {
            const operador = new Operador();
            const dados = await operador.consultar(termo);
            resposta.status(200).json({
                status: true,
                mensagem: "Operadores consultados com sucesso!",
                dados: dados
            });
        } catch (erro) {
            resposta.status(500).json({
                status: false,
                mensagem: "Erro ao consultar operadores: " + erro.message
            });
        }
    }

    async consultarPorCPF(requisicao, resposta) {
        resposta.type('application/json');
        const cpf = requisicao.params.cpf;

        try {
            const operador = new Operador();
            const dados = await operador.consultarCPF(cpf);
            if (dados.length > 0) {
                resposta.status(200).json({
                    status: true,
                    mensagem: "Operador encontrado com sucesso!",
                    dados: dados[0]
                });
            } else {
                resposta.status(404).json({
                    status: false,
                    mensagem: "Operador não encontrado!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                status: false,
                mensagem: "Erro ao consultar operador: " + erro.message
            });
        }
    }
} 