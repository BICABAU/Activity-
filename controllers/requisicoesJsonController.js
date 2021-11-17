const Certificado = require('../models/Certificado')
const Course = require('../models/Course')
const User = require('../models/User')

exports.cursos_json = function (req, res) {
  let course = new Course()
  course.recuperarCursos(req.params.id_course_types)
    .then((cursos_recuperados) => {
      res.json({ cursos_recuperados: cursos_recuperados })
    })
    .catch(function (err) {
      res.send(err)
    })
}

exports.subcategorias_json = function (req, res) {
  let certificado = new Certificado()
  certificado.readCatAcsSubCategoria(req.params.name_activity_type)
    .then((subcategorias_recuperadas) => {
      res.json({ subcategorias_recuperadas: subcategorias_recuperadas })
    })
    .catch((err) => {
      res.send(err)
    })
}

exports.horas_json = function (req, res) {
  let user = new User(req.session.user)
  user.getTotalHours(req.params.email)
    .then((hours) => {
      res.json({ hours_recovered: hours })
    })
    .catch((err) => {
      res.send(err)
    })

}