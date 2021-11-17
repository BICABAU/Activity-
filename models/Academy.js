const pool = require("../config/db");

let Academy = function ({ name, initials, city, uf }) {
  this.name = name
  this.initials = initials
  this.city = city
  this.uf = uf
  this.errors = [];
}

Academy.prototype.recuperarAcademies = function () {
  const consulta = 'SELECT * from cursos inner join tipo_curso' +
    ' ON (cursos.id_tipo_curso_fk = tipo_curso.id_tipo_curso)' +
    ` WHERE id_tipo_curso_fk = ${tipo_curso}`

  const values = []
  return new Promise((resolve, reject) => {
    pool.query(consulta, values, (error, results) => {
      if (error) {
        reject("Erro ao retornar cursos de um determinado tipo!")
      } else {
        cursos_recuperado = results.rows
        resolve(cursos_recuperado)
      }
    });
  });
};

// Não implementado
Academy.prototype.create = function () { }

module.exports = Academy;