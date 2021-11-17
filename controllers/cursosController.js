

exports.recuperarCursos = function (req, res) {
  let cursos = new Curso();

  cursos
    .recuperarCursos()
    .then((resultado) => console.log("cursos -- EXEMPLO"))
    .catch((err) => res.send(err))
}