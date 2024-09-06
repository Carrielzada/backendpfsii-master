import TipoMaquinarioDAO from "../Persistencia/TipoMaquinarioDAO.js";
//não esqueça do .js no final da importação

export default class TipoMaquinario {
    //definição dos atributos privados
    #codigo;
    #descricao;

    constructor(codigo=0, descricao=''){
        this.#codigo=codigo;
        this.#descricao=descricao;
    }

    //métodos de acesso públicos

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDesc){
        this.#descricao = novaDesc;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            codigo:this.#codigo,
            descricao:this.#descricao
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const tpmDAO = new TipoMaquinarioDAO();
        await tpmDAO.gravar(this);
    }

    async excluir(){
        const tpmDAO = new TipoMaquinarioDAO();
        await tpmDAO.excluir(this);
    }

    async atualizar(){
        const tpmDAO = new TipoMaquinarioDAO();
        await tpmDAO.atualizar(this);

    }

    async consultar(parametro){
        const tpmDAO = new TipoMaquinarioDAO();
        return await tpmDAO.consultar(parametro);
    }

    async possuiMaquinario(){
        const tpmDAO = new TipoMaquinarioDAO();
        return await tpmDAO.possuiMaquinario(this);
    }
}