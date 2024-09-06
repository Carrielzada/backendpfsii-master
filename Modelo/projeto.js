import ProjetoDAO from "../Persistencia/projetoDAO.js";

export default class Projeto{
    #codigo;
    #operador;
    #data;
    #total;
    #maquinarios;

    constructor(codigo, operador, data, total, maquinario){
        this.#codigo = codigo;
        this.#operador = operador;
        this.#data = data;
        this.#total = total;
        this.#maquinarios = maquinario;
    }
    
    get codigo(){
        return this.#codigo;
}
    set codigo(novoCodigo){
        if (novoCodigo === "" || typeof novoCodigo !== "number"){
            console.log("Código inválido!");
        }
        else{
            this.#codigo = novoCodigo;
        }
    }

    get operador(){
        return this.#operador;
    }
    set operador(novoOperador){
        this.#operador = novoOperador;
}

    get data(){
        return this.#data;
    }
    set data(novaData){
        this.#data = novaData;
    }
    
    get total(){
        return this.#total;
    }
    set total(novoTotal){
        this.#total = novoTotal;
    }

    get maquinarios(){
        return this.#maquinarios;
    }
    set maquinarios(novoMaquinario){
        this.#maquinarios = novoMaquinario;
    }

    toJSON(){
        return{
            "codigo": this.#codigo,
            "operador": this.#operador,
            "data": this.#data,
            "total": this.#total,
            "maquinarios": this.#maquinarios
        };
    }

    async gravar(){
        const projetoDAO = new ProjetoDAO();
        this.#codigo = await projetoDAO.adicionar(this);
    }
    async atualizar(){
        const projetoDAO = new ProjetoDAO();
        await projetoDAO.alterar(this);
    }
    async apagar(){
        const projetoDAO = new ProjetoDAO();
        await projetoDAO.deletar(this);
    }
    async consultar(termoBusca) {
        const projetoDAO = new ProjetoDAO();
        const listaProjetos = await projetoDAO.consultar(termoBusca);
        return listaProjetos;
    }
}