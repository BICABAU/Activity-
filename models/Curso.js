const pool = require("../config/db");

let Curso = function (data) {
  this.data = data;
  this.errors = [];
}

Curso.prototype.recuperarCursos = function (tipo_curso) {
  const consulta = 'SELECT * from cursos inner join tipo_curso' +
    ' ON (cursos.id_tipo_curso_fk = tipo_curso.id_tipo_curso)' +
    ` WHERE id_tipo_curso_fk = ${tipo_curso}`

  console.log(consulta)
  const values = []
  return new Promise((resolve, reject) => {
    pool.query(consulta, values, (error, results) => {
      if (error) {
        reject("Erro ao retornar cursos de um determinado tipo!")
      } else {
        cursos_recuperado = results.rows
        console.log(cursos_recuperado)
        // resolve("Usuário inserido com sucesso!")
        resolve(cursos_recuperado)
      }
    });
  });
};

module.exports = Curso;