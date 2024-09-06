import operadorDAO from '../Persistencia/operadorDAO.js';

export default class Operador{
   #codigo;
   #nome;
   #telefone;
   #endereco;

constructor(codigo, nome, telefone, endereco){
    this.#codigo = codigo;
    this.#nome = nome;
    this.#telefone = telefone;
    this.#endereco = endereco;
}

get codigo(){
    return this.#codigo;
}
set codigo(novoCodigo){
    if (novoCodigo === "" || novoCodigo === null || novoCodigo === undefined){
        console.log("Formato de dado inválido");
    }
    else{
        this.#codigo = novoCodigo;
    }
}

get nome(){
    return this.#nome;
}
set nome(novoNome){
    if (novoNome === ""){
        console.log("Dado não pode ser vazio");
    }
    else{
        this.#nome = novoNome;
    }
}

get telefone(){
    return this.#telefone;
}
set telefone(novoTelefone){
    if (novoTelefone === "" || novoTelefone.length !== 11){
        console.log("Formato de telefone inválido");
    }
    else{
        this.#telefone = novoTelefone;
    }
}

get endereco(){
    return this.#endereco;
}
set endereco(novoEndereco){
    if (novoEndereco === ""){
        console.log("Dado não pode ser vazio");
    }
    else{
        this.#endereco = novoEndereco;
    }
}

toJSON(){
    return {
        codigo: this.#codigo,
        nome: this.#nome,
        telefone: this.#telefone,
        endereco: this.#endereco
    };
}

async gravar(){
    const operadorDAO = new OperadorDAO();
    this.codigo = await operadorDAO.adicionar(this);
}
async atualizar(){
    const operadorDAO = new OperadorDAO();
    await operadorDAO.atualizar(this);
}
async apagar(){
    const operadorDAO = new OperadorDAO();
    await operadorDAO.apagar(this);
}
async consultarPorNome(nome){
    const operadorDAO = new OperadorDAO();
    const listaOperadores = await operadorDAO.consultar(nome);
    return listaOperadores;
}
async consultarPorTelefone(telefone){
    const operadorDAO = new OperadorDAO();
    const listaOperadores = await operadorDAO.consultar(telefone);
    return listaOperadores;
}
}
