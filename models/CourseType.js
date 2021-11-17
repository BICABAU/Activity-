const pool = require("../config/db");

let CourseType = function () {
  this.errors = [];
}

CourseType.prototype.recuperarTiposCursos = function () {
  const consulta = 'select id_course_types,name from course_types'
  const values = []
  return new Promise((resolve, reject) => {
    pool.query(consulta, values, (error, results) => {
      if (error) {
        reject("Erro ao cadastrar o aluno!")
      } else {
        tipos_cursos_recuperados = results.rows
        // resolve("Usuário inserido com sucesso!")
        resolve(tipos_cursos_recuperados)
      }
    });
  });
};

// Não implementado
CourseType.prototype.create = function () {

}

module.exports = CourseType;