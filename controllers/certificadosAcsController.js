const Certificado = require('../models/Certificado')
const User = require('../models/User')

exports.getAllAcs = function (req, res) {
    let user = new User(req.session.user)
    user.readByEmail().then((resultado) => {
        let certificado = new Certificado()
        certificado
            .readAllACs(resultado)
            .then((resultado) => {
                res.render("pages/atividadesComplementares", { certificado: resultado })
            }).catch((err) => {
                res.send(err);
            })
    })

};

exports.getByIdAc = function (req, res) {
    const id = req.params.id_uploaded;
    let certificado = new Certificado(null, null, req.session.user.email);
    certificado
        .readOneById(id)
        .then((resultado) => {
            res.render("pages/mostrar_ac", { certificado: resultado, layout: 'pages/mostrar_ac' })
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.apagarCertificadoAcs = function (req, res) {
    const key_name = req.params.key_name
    const id = req.params.id_uploaded
    let certificado = new Certificado(null, null, req.session.user.email)
    certificado
        .removerHorasACs(id).then(certificado.apagarAws(key_name))
        .then(certificado.delete_certifications(id)).then(certificado.delete_uploaded_certifications(key_name))
        .then((result) => {
            res.redirect('/home')
        })
        .catch((err) => {
            res.send(err)
        })
};