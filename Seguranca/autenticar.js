import { assinar, verificarAssinatura } from './funcoesJWT.js';

export function login(req, res){
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if (usuario === 'admin' && senha === 'admin'){ //lembre-se de verificar com uma consulta no banco de dados.
        req.session.usuario = usuario;
        res.status(200).json({
            "status": true,
            "mensagem": "Logado com sucesso!",
            "token": assinar(usuario)}
        );
    }
    else{
        res.status(401).json({
            "status": false,
            "mensagem": "Usuário ou senha inválidos!"
        });
    }
}

export function logout(req, res){
    req.session.destroy();
    res.status(200).json({
        "status": true,
        "mensagem": "Logout realizado com sucesso!"
    });
}

//funciona como um middleware, que é processado a cada requisição
//decidindo se ela será atendida ou recusada
export function verificarAutenticacao(req, res, next){
    const token = req.headers['authorization'];
    let tokenVerificado = undefined;
    if (token){
        tokenVerificado = verificarAssinatura(token);
        if (tokenVerificado != undefined && tokenVerificado.usuario == req.session.usuario){
            next();    
        }
    else{
        res.status(401).json({
            "status": false,
            "mensagem": "Acesso não autorizado! Faça o login na aplicação para obter um token válido."
        });
    }
    }
}