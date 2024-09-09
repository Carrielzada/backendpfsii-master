import ProjetoDAO from "../Persistencia/ProjetoDAO.js";
import Operador from "./operador.js";
import ProjetoMaquinario from "./ProjetoMaquinario.js";

export default class Projeto {
    #codigo;
    #operador;
    #data_projeto;
    #total;
    #maquinarios;

    constructor(codigo, operador, data_projeto, total, maquinarios = []) {
        this.#codigo = codigo;
        this.#operador = operador;
        this.#data_projeto = new Date(data_projeto);
        this.#total = total;
        this.#maquinarios = maquinarios;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        if (novoCodigo === "" || typeof novoCodigo !== "number") {
            throw new Error("Código inválido!");
        }
        this.#codigo = novoCodigo;
    }

    get operador() {
        return this.#operador;
    }

    set operador(novoOperador) {
        this.#operador = novoOperador;
    }

    get data_projeto() {
        return this.#data_projeto;
    }

    set data_projeto(novaData) {
        this.#data_projeto = new Date(novaData);
    }

    get total() {
        return this.#total;
    }

    set total(novoTotal) {
        this.#total = novoTotal;
    }

    get maquinarios() {
        return this.#maquinarios;
    }

    set maquinarios(novosMaquinarios) {
        this.#maquinarios = novosMaquinarios;
    }

    adicionarMaquinario(projetoMaquinario) {
        if (projetoMaquinario instanceof ProjetoMaquinario) {
            this.#maquinarios.push(projetoMaquinario);
        }
    }

    toJSON() {
        return {
            "codigo": this.#codigo,
            "operador": this.#operador,
            "data_projeto": this.#data_projeto,
            "total": this.#total,
            "maquinarios": this.#maquinarios
        };
    }

    async gravar() {
        const projetoDAO = new ProjetoDAO();
        await projetoDAO.gravar(this);
    }

    async atualizar() {
        const projetoDAO = new ProjetoDAO();
        await projetoDAO.atualizar(this);
    }

    async excluir() {
        const projetoDAO = new ProjetoDAO();
        await projetoDAO.excluir(this);
    }

    async consultar(termoBusca) {
        const projetoDAO = new ProjetoDAO();
        return await projetoDAO.consultar(termoBusca);
    }
}