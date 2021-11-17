const User = require('../models/User')
const CourseType = require('../models/CourseType')
const ActivityType = require('../models/ActivityType')


exports.cadastro = function (req, res) {
    let courseType = new CourseType()
    courseType.recuperarTiposCursos()
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
    let activityType = new ActivityType()
    activityType.listAllActivityAtpas().then((ActivityRecoveredAtpas) => {
        activityType.listAllActivityComplementary().then((ActivityRecoveredComplementary) => {
            if (req.session.user) {
                res.render('pages/home', { AtpasRecovered: ActivityRecoveredAtpas, ComplementaryRecovered: ActivityRecoveredComplementary })
            } else {
                res.render('/')
            }
        })
    })
}

exports.estatisticas = function (req, res) {
    res.render('pages/estatisticas')
}

exports.perfilDoAluno = function (req, res) {
    let user = new User(req.session.user)
    user.readByEmail().then((results) => {
        res.render('pages/perfilDoAluno', { user_info: results })
    })
        .catch((err) => {
            res.send(err)
        })

}

exports.alterarDados = function (req, res) {
    let user = new User(req.body);
    user
        .alterarDados(), user.readByEmail()
            .then((result) => {
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

exports.patchNotes = function (req, res) {
    res.render('pages/atualizacoes')
}