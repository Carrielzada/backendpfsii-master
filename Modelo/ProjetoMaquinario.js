import ProjetoMaquinarioDAO from "../Persistencia/ProjetoMaquinarioDAO.js";

export default class ProjetoMaquinario {
    #codigo;
    #projeto;
    #maquinario;
    #quantidade;
    #precoUnitario;

    constructor(codigo, projeto, maquinario, quantidade, precoUnitario) {
        this.#codigo = codigo;
        this.#projeto = projeto;
        this.#maquinario = maquinario;
        this.#quantidade = quantidade;
        this.#precoUnitario = precoUnitario;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get projeto() {
        return this.#projeto;
    }

    set projeto(novoProjeto) {
        this.#projeto = novoProjeto;
    }

    get maquinario() {
        return this.#maquinario;
    }

    set maquinario(novoMaquinario) {
        this.#maquinario = novoMaquinario;
    }

    get quantidade() {
        return this.#quantidade;
    }

    set quantidade(novaQuantidade) {
        this.#quantidade = novaQuantidade;
    }

    get precoUnitario() {
        return this.#precoUnitario;
    }

    set precoUnitario(novoPrecoUnitario) {
        this.#precoUnitario = novoPrecoUnitario;
    }

    toJSON() {
        return {
            codigo: this.#codigo,
            projeto: this.#projeto,
            maquinario: this.#maquinario,
            quantidade: this.#quantidade,
            precoUnitario: this.#precoUnitario
        };
    }

    async gravar() {
        const dao = new ProjetoMaquinarioDAO();
        await dao.gravar(this);
    }

    async atualizar() {
        const dao = new ProjetoMaquinarioDAO();
        await dao.atualizar(this);
    }

    async excluir() {
        const dao = new ProjetoMaquinarioDAO();
        await dao.excluir(this);
    }

    async consultar(termo) {
        const dao = new ProjetoMaquinarioDAO();
        return await dao.consultar(termo);
    }
}