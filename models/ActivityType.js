const pool = require("../config/db")

let ActivityType = function (
  name,
  description,
  is_complementary_activity,
  is_extension_activity,
  is_atpas_activity,
  name_subcategory,
  description_subcategory
) {
  this.name = name;
  this.description = description;
  this.is_complementary_activity = is_complementary_activity;
  this.is_extension_activity = is_extension_activity;
  this.is_atpas_activity = is_atpas_activity;
  this.name_subcategory = name_subcategory;
  this.description_subcategory = description_subcategory;
}

ActivityType.prototype.listAllActivityComplementary = function () {
    const consulta = "select * from activity_types where is_complementary_activity = true order by id_activity_types asc"
    const values = []
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao recuperar as atividades" + error)
            } else {
                ActivityRecoveredComplementary = results.rows
                resolve(ActivityRecoveredComplementary);
            }
        });
    });
}

ActivityType.prototype.listAllActivityAtpas = function () {
    const consulta = "select * from activity_types where is_atpas_activity = true order by id_activity_types asc"
    const values = []
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao recuperar as atividades" + error)
            } else {
                ActivityRecoveredAtpas = results.rows
                resolve(ActivityRecoveredAtpas);
            }
        });
    });
}


ActivityType.prototype.create = function ()  {

}

ActivityType.prototype.delete = function (id_type) {

}

module.exports = ActivityType;