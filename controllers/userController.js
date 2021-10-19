const TipoCurso = require('../models/TipoCurso')
const User = require('../models/User')

exports.cadastro = function (req, res) {
    let tipoCurso = new TipoCurso()
    tipoCurso.recuperarTiposCursos()
        .then((tipos_cursos_recuperados) => {
            res.render('pages/cadastro', { tipos_cursos_recuperado: tipos_cursos_recuperados, layout: 'pages/cadastro' })
        })
        .catch((err) => {
            res.send(err)
        })
}

exports.login_form = function (req, res) {
    res.render('pages/login', { layout: 'pages/login' })
}

exports.esqueciASenha = function (req, res) {
    res.render('pages/esqueciAsenha', { layout: 'pages/esqueciAsenha' })

}

exports.home = function (req, res) {
    if (req.session.user) {
        res.render('pages/home')
    } else {
        res.render('/')
    }
}

exports.atividadesComplementares = function (req, res) {
    res.render('pages/atividadesComplementares')
}

exports.extensao = function (req, res) {
    res.render('pages/extensao')
}

exports.estatisticas = function (req, res) {
    res.render('pages/estatisticas')
}

exports.perfilDoAluno = function (req, res) {
    if (req.session.user) {
        res.render('pages/perfilDoAluno')
    } else {
        res.render('pages/perfilDoAluno')
    }
}

exports.alterarDados = function (req, res) {
    let user = new User(req.body);
    user
        .alterarDados(), user.readByEmail()
            .then((result) => {
                req.session.user = {
                    nome: usuarioRecuperado.nome,
                    sobrenome: usuarioRecuperado.sobrenome,
                    curso: usuarioRecuperado.curso,
                    email: user.data.email,
                    cpf: usuarioRecuperado.cpf,
                    telefone: usuarioRecuperado.telefone,
                    instituicao: usuarioRecuperado.instituicao,
                    cidade: usuarioRecuperado.cidade,
                    senha: user.data.senha,
                    nascimento: usuarioRecuperado.nascimento,
                    horas_acs: usuarioRecuperado.horas_acs,
                    horas_aes: usuarioRecuperado.horas_aes,
                }
                res.redirect('/perfilDoAluno')
            })
            .catch((err) => {
                res.send(err)
            })
}

exports.cadastrar = function (req, res) {
    let user = new User(req.body);
    user.create()
        .then((result) => {
            res.render('pages/login', { layout: 'pages/login' });
        })
        .catch((err) => {
            res.send(err);
        });
};