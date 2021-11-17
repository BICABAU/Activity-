const User = require('../models/User')

exports.login = function (req, res) {
  let user = new User(req.body);
  user
    .login(req.body.email)
    .then((usuarioRecuperado) => {
      req.session.user = {
        first_name: usuarioRecuperado.first_name,
        last_name: usuarioRecuperado.last_name,
        email: usuarioRecuperado.email,
        curso: usuarioRecuperado.id_course
      }

      req.session.save(() => {
        res.redirect('/home')
      })
    })
    .catch((err) => {
      res.send(err)
    })
}

exports.logout = function (req, res) {
  req.session.destroy(() => {
    res.redirect("/")
  })
}