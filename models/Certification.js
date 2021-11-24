const pool = require("../config/db")

let Certification = function (
  certification_name,
  description,
  activity_start,
  activity_end,
  amount_hours,
  id_activity,
  id_uploaded,
  id_user
) {
  this.name = certification_name;
  this.description = description;
  this.activity_start = activity_start;
  this.activity_end = activity_end;
  this.amount_hours = amount_hours;
  this.amount_valid_hours = 0;//hoursValidation(amount_hours);
  this.id_activity = id_activity;
  this.id_uploaded = id_uploaded;
  this.id_user = id_user;
}

Certification.prototype.listAll = function () {

}

Certification.prototype.listPerUser = function (id_user) {

}

Certification.prototype.create = function () {
  const insert = 'INSERT INTO certifications' +
    ' (name, description, activity_start, activity_end, amount_hours, amount_valid_hours, id_activity, id_uploaded, id_user_fk)' +
    ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)' +
    ' RETURNING *';
  const values = [this.name, this.description, this.activity_start, this.activity_end, this.amount_hours, this.amount_valid_hours, this.id_activity, this.id_uploaded, this.id_user];
  return new Promise((resolve, reject) => {
    pool.query(insert, values, (error, results) => {
      if (error) {
        reject("Create Certification:" + error)
      } else {
        resolve(results.rows[0])
      }
    })
  })
}

Certification.prototype.delete = function (id_certification) {
}

/**
 * INCOMPLETO - falta considerar as 'horas maximas' por atividade especifica
 * e/ou a 'quantidade de vezes' que ela pode ser usada
 */
Certification.prototype.hoursValidation = function (
  amount_hours,
  searchedActivity,
  searchedUser,
  searchedCourse
) {
  const {
    hours_per_instance,
    hours_max,
    is_extension_activity,
  } = searchedActivity;

  const { email } = searchedUser;

  if (amount_hours > hours_per_instance) {
    throw new Error('A quantidade de horas da atividade passou do limite');
  }

  var values, amount_valid_hours;
  const update_options = {
    update_complementary: {
      query: 'UPDATE users' +
        " SET complementary_activity = $1" +
        ' WHERE email = $2' +
        ' RETURNING *'
    },
    update_extension: {
      query: 'UPDATE users' +
        " SET extension_activity = $1" +
        ' WHERE email = $2' +
        ' RETURNING *'
    }
  }

  const type_activity = is_extension_activity ? 'extension_activity' : 'complementary_activity';
  const update = type_activity === 'extension_activity' ? update_options.update_extension.query : update_options.update_complementary.query

  switch (type_activity) {
    case 'complementary_activity':
      if (parseFloat(searchedCourse.max_complementary_activity) > parseFloat(searchedUser.complementary_activity)) {
        var variation = searchedCourse.max_complementary_activity - searchedUser.complementary_activity;

        if (variation < hours_per_instance) {
          values = [parseFloat(searchedUser.complementary_activity) + parseFloat(variation), searchedUser.email]
          amount_valid_hours = variation;
        } else {
          values = [parseFloat(searchedUser.complementary_activity) + parseFloat(hours_per_instance), searchedUser.email]
          amount_valid_hours = hours_per_instance;
        }
      }

      break;

    case 'extension_activity':
      if (parseFloat(searchedCourse.max_extension_activity) > parseFloat(searchedUser.extension_activity)) {
        var variation = searchedCourse.max_extension_activity - searchedUser.extension_activity;

        if (variation < amount_hours) {
          values = [parseFloat(searchedUser.extension_activity) + parseFloat(variation), searchedUser.email]
          amount_valid_hours = variation;
        } else {
          values = [parseFloat(searchedUser.extension_activity) + parseFloat(amount_hours), searchedUser.email]
          amount_valid_hours = amount_hours;
        }
      }

      break;
  }

  return new Promise((resolve, reject) => {
    pool.query(update, values, (error, results) => {
      if (error) {
        reject(`Erro ao adicionar horas do usuario -> ${error} and code ${error.code}`)
      } else {
        const datas = {
          results: results,
          type_activity: type_activity,
          amount_valid_hours: amount_valid_hours
        }

        resolve(datas)
      }
    })
  })
}

Certification.prototype.setAmountValidHours = function (certification_id, amount_valid_hours) {
  const update = 'UPDATE certifications' +
    ' SET amount_valid_hours = $1' +
    ' WHERE id_certification = $2'

  const values = [amount_valid_hours, certification_id]

  return new Promise((resolve, reject) => {
    pool.query(update, values, (error, results) => {
      if (error) {
        reject(`Erro ao inserir dentro do certificado, a quantidade de horas válidas -> ${error} and code ${error.code}`)
      } else {
        resolve(results)
      }
    })
  })

}

module.exports = Certification;