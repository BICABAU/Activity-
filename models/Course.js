const pool = require("../config/db");


let Course = function () {
  this.errors = [];
}

Course.prototype.recuperarCursos = function (id_courses) {
  const consulta = 'SELECT id_courses, name_course from courses inner join course_types' +
    ' ON (courses.id_course_type = course_types.id_course_types)' +
    ` WHERE id_course_type = ${id_courses}`

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
Course.prototype.create = function () { }

Course.prototype.searchCourseByUser = function (email) {
  const select = 'SELECT * FROM courses JOIN users' +
    ' ON (courses.id_courses = users.id_course)' +
    ` WHERE users.email = $1`

  const values = [email];

  return new Promise((resolve, reject) => {
    pool.query(select, values, (error, results) => {
      if (error) {
        reject("Nenhum curso encontrado com este e-mail!")
      } else {
        resolve(results.rows[0])
      }
    });
  });
}

module.exports = Course;