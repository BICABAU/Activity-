/**
 * EU quero salvar um novo certificado e automaticamente fazer o usuario concluir a missão
 *
 * [X] - Salvar o caminho do arquivo com UPLOADED-CERTIFICATION
 * [0] - Salvar dados do certificado em CERTIFICATION
 *  [0] - Buscar usuário
 *  [0] - Validar atividade
 * [0] - Buscar uma missão equivalente a atividade do certificado - MISSION
 * [0] - Salvar essa missão em FINISHED-MISSION
 * [0] - Contabilizar os pontos em USER
 */

const UploadedCertification = require('../models/UploadedCertification');
const Activity = require('../models/Activity');
const User = require('../models/User');
const Certification = require('../models/Certification');
const Course = require('../models/Course');


exports.uploadCertification = function (req, res) {
  const {
    description,
    activity_start,
    activity_end,
    amount_hours,
    subcategoria_atividade,
    // subcategoria_atividade: id_activity_type,
    categoria_atividade
  } = req.body;

  const {
    originalname: file_name,
    key: key_name,
    size,
  } = req.file;

  // Se subcategoria_atividade tiver um valor diferente de nulo, significa que é
  // uma atividade complementar, logo, eu pegarei o id da subcategoria
  // Se subcategoria_atividade for nulo, é pq é atividade de extensão, logo, pegarei
  // o id da categoria_atividade
  const id_activity_type = subcategoria_atividade ? subcategoria_atividade : categoria_atividade

  // Se o arquivo estiver sendo armazenado na AWS, retorna "location"
  // Se for no servidor local, retorna "path"
  const url = (req.file.location) ? req.file.location : req.file.path

  const activity = new Activity();
  const user = new User(req.session.user)
  const course = new Course()

  const uploadedCertification = new UploadedCertification(key_name, size, url, file_name)

  uploadedCertification.create()
    .then(file_uploaded => {
      activity.searchOne(id_activity_type)
        .then(searchedActivity => {
          user.readByEmail(req.session.user.email)
            .then(searched_user => {
              if (!searched_user) {
                return new Error('User doesnt found')
              }

              const certification = new Certification(file_uploaded.name, description, activity_start, activity_end, amount_hours, searchedActivity.id_type, file_uploaded.id, searched_user.id_user)
              certification.create()
                .then(certification_created => {

                  course.searchCourseByUser(searched_user.email)
                    .then(searchedCourse => {
                      certification.hoursValidation(certification_created.amount_hours, searchedActivity, searched_user, searchedCourse)
                        .then(({ results, typeActivity, amount_valid_hours }) => {
                          console.log(amount_valid_hours)

                          certification.setAmountValidHours(certification_created.id_certification, amount_valid_hours)
                            .then(res.redirect('/home'))
                            .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}