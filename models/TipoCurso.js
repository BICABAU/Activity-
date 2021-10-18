const pool = require("../config/db");

let TipoCurso = function (data) {
  this.data = data;
  this.errors = [];
}

TipoCurso.prototype.recuperarTiposCursos = function () {
  const consulta = 'select * from tipo_curso'
  const values = []
  return new Promise((resolve, reject) => {
    pool.query(consulta, values, (error, results) => {
      if (error) {
        reject("Erro ao cadastrar o aluno!")
      } else {
        tipos_cursos_recuperados = results.rows
        console.log(tipos_cursos_recuperados)
        // resolve("Usuário inserido com sucesso!")
        resolve(tipos_cursos_recuperados)
      }
    });
  });
};

module.exports = TipoCurso;