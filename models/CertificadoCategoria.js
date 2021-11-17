const pool = require("../config/db")

let CertificadoCategoria = (data) => {
  this.data = data;
  this.errors = []
}

CertificadoCategoria.prototype.lerTodasCategoriasAcs = () => {
  const consulta = 'select * from acs'
  const values = []
  return new Promise((resolve, reject) => {
    pool.query(consulta, values, (error, results) => {
      if (error) {
        reject("Erro ao recuperar as Categorias")
      } else {
        categorias_recuperadas_acs = results.rows
        resolve(categorias_recuperadas_acs)
      }
    });
  });
};

CertificadoCategoria.prototype.lerTodasCategoriasAes = () => {
  const consulta = "SELECT * from aes"
  return new Promise((resolve, reject) => {
    pool.query(consulta, (error, results) => {
      if (error) {
        reject("Não foi possivel ler as categorias" + error)
      } else {
        resultado_categoria = results.rows
        resolve(resultado_categoria)
      }
    })
  })
}