const pool = require("../config/db")

const UploadedCertification = function (key_name, size, url, name) {
  this.key_name = key_name;
  this.name = name;
  this.size = size;
  this.url = url;
}

UploadedCertification.prototype.listAll = function () {
  /**
   * Listar todos os arquivos upados no servidor com JOIN em usuarios
   * para mostrar os respectivos "donos"
   */
  return 'oi';
}

UploadedCertification.prototype.create = function () {
  const insert = 'INSERT INTO uploaded_certifications' +
    ' (key_name, size, url, name)' +
    ' VALUES ($1, $2, $3, $4)' +
    ' RETURNING *';

  const values = [this.key_name, this.size, this.url, this.name];

  return new Promise((resolve, reject) => {
    pool.query(insert, values, (error, results) => {
      if (error) {
        reject("create uploaded certification: " + error)
      } else {
        resolve(results.rows[0])
      }
    })
  })
}

UploadedCertification.prototype.delete = (id_user, id_uploaded) => {
  /**
   * Só pode deletar um arquivo se for o mesmo usuario que upou
   */
  return 'oi';

}

UploadedCertification.prototype.deleteAWS = (id_user, id_uploaded) => {
  /**
   * Só pode deletar um arquivo se for o mesmo usuario que upou
   */

  return 'oi';

}

module.exports = UploadedCertification;