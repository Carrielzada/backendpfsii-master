import MaquinarioDAO from "../Persistencia/MaquinarioDAO.js";
import TipoMaquinario from "./TipoMaquinario.js";

export default class Maquinario{
    #codigo;
    #descricao;
    #precoCusto;
    #precoVenda;
    #qtdEstoque;
    #tipoMaquinario;

    constructor(codigo=0,descricao="", precoCusto=0, 
                precoVenda=0, qtdEstoque=0, tipoMaquinario=null
                ){
        this.#codigo=codigo;
        this.#descricao=descricao;
        this.#precoCusto=precoCusto;
        this.#precoVenda=precoVenda;
        this.#qtdEstoque=qtdEstoque;
        this.#tipoMaquinario=tipoMaquinario;
    }

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
        this.#descricao=novaDesc;
    }

    get precoCusto(){
        return this.#precoCusto;
    }

    set precoCusto(novoPreco){
        this.#precoCusto = novoPreco
    }

    get precoVenda(){
        return this.#precoVenda;
    }
    
    set precoVenda(novoPreco){
        this.#precoVenda = novoPreco
    }

    get qtdEstoque(){
        return this.#qtdEstoque;
    }

    set qtdEstoque(novaQtd){
        this.#qtdEstoque = novaQtd;
    }

    get tipoMaquinario(){
        return this.#tipoMaquinario;
    }

    set tipoMaquinario(novoTipo){
        if(novoTipo instanceof TipoMaquinario){
            this.#tipoMaquinario = novoTipo;
        }
    }

    toJSON(){
        return {
            codigo:this.#codigo,
            descricao:this.#descricao,
            precoCusto:this.#precoCusto,
            precoVenda:this.#precoVenda,
            qtdEstoque:this.#qtdEstoque,
            tipoMaquinario:this.#tipoMaquinario.toJSON()
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const mqDAO = new MaquinarioDAO();
        await mqDAO.gravar(this);
     }
 
     async excluir(){
        const mqDAO = new MaquinarioDAO();
        await mqDAO.excluir(this);
     }
 
     async alterar(){
        const mqDAO = new MaquinarioDAO();
        await mqDAO.atualizar(this);
     }
 
     async consultar(termo){
        const mqDAO = new MaquinarioDAO();
        return await mqDAO.consultar(termo);
     }

}