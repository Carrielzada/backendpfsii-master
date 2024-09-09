import OperadorDAO from '../Persistencia/OperadorDAO.js';

export default class Operador{
   #codigo;
   #cpf;
   #nome;
   #telefone;
   #endereco;

constructor(codigo, nome, cpf, telefone, endereco){
    this.#codigo = codigo;
    this.#cpf = cpf;
    this.#nome = nome;
    this.#telefone = telefone;
    this.#endereco = endereco;
}

get codigo(){
    return this.#codigo;
}
set codigo(novoCodigo) {
    if (novoCodigo === "" || typeof novoCodigo !== "number") {
        throw new Error("Código inválido!");
    }
    this.#codigo = novoCodigo;
}
get cpf(){
    return this.#cpf;
}

set cpf(novoCpf){
    if (novoCpf === "" || typeof novoCpf !== "string"){
        throw new Error("Formato de dado inválido");
    }
    this.#cpf = novoCpf;
}

get nome(){
    return this.#nome;
}
set nome(novoNome){
    if (novoNome === ""){
        throw new Error("Dado não pode ser vazio");
    }
    this.#nome = novoNome;
}

get telefone(){
    return this.#telefone;
}
set telefone(novoTelefone){
    if (novoTelefone === "" || novoTelefone.length !== 11){
        throw new Error("Formato de telefone inválido");
    }
    this.#telefone = novoTelefone;
}

get endereco(){
    return this.#endereco;
}
set endereco(novoEndereco){
    if (novoEndereco === ""){
        throw new Error("Dado não pode ser vazio");
    }
    this.#endereco = novoEndereco;
}

toJSON(){
    return {
        codigo: this.#codigo,
        nome: this.#nome,
        cpf: this.#cpf,
        telefone: this.#telefone,
        endereco: this.#endereco
    };
}

async gravar(){
    const operadorDAO = new OperadorDAO();
    await operadorDAO.incluir(this);
}
async atualizar(){
    const operadorDAO = new OperadorDAO();
    await operadorDAO.atualizar(this);
}
async apagar(){
    const operadorDAO = new OperadorDAO();
    await operadorDAO.apagar(this);
}
async consultar(termo){
    const operadorDAO = new OperadorDAO();
    return await operadorDAO.consultar(termo);
 }
async consultarPorTelefone(telefone){
    const operadorDAO = new OperadorDAO();
    const listaOperadores = await operadorDAO.consultarPorTelefone(telefone);
    return listaOperadores;
}
}
