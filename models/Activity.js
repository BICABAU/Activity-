const pool = require("../config/db")

const Activity = function (quantity, hours_per_instance, id_type) {
  this.quantity = quantity
  this.hours_per_instance = hours_per_instance
  this.id_type = id_type
}

Activity.prototype.listAll = function () {
  return '';
}

Activity.prototype.listAllPerType = function () {

}

Activity.prototype.listAllPerSubcategory = function () {

}

Activity.prototype.searchOne = function (id_type) {
  const select = "SELECT * FROM activities AS act" +
    " JOIN activity_types AS type ON act.id_type = type.id_activity_types" +
    " WHERE act.id_type = $1";
  const values = [id_type];

  return new Promise((resolve, reject) => {
    pool.query(select, values, (error, results) => {
      if (error) {
        reject("Atividade não encontrada");
      } else {
        resolve(results.rows[0]);

      }
    });
  });
};

Activity.prototype.create = function () {

}

Activity.prototype.delete = function (id_activity) {

}

module.exports = Activity;