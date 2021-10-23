const pool = require("../config/db")

const CertificadoCategoria = (data) => {
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
        console.log(categorias_recuperadas_acs)
        // resolve("Usuário inserido com sucesso!")
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