const express = require('express')
const router = express.Router()
const Certificados = require('./models/Certificado');
const multer = require('multer')
const multerConfig = require('./config/multer')

const { mustBeLoggedIn } = require('./middlewares/mustBeLoggedIn')

const userController = require('./controllers/userController')
const sessaoController = require('./controllers/sessaoController')
const certificadosAcsController = require('./controllers/certificadosAcsController')
const certificadosAesController = require('./controllers/certificadosAesController')
const certificationController = require('./controllers/certificationsController');
const postController = require('./controllers/postController')
const requisicoesJsonController = require('./controllers/requisicoesJsonController');
const cursosController = require('./controllers/cursosController');


//roteamentos do usuário
router.get('/', userController.login_form)
router.get('/home', userController.home)
router.get('/cadastro', userController.cadastro)
router.get('/esqueciASenha', userController.esqueciASenha)
router.get('/perfilDoAluno', mustBeLoggedIn, userController.perfilDoAluno)
router.post('/cadastrar', userController.cadastrar)
router.post('/alterarDados', mustBeLoggedIn, userController.alterarDados)

// roteamento de estatisticas
router.get('/estatisticas', mustBeLoggedIn, postController.pegarAtividades, userController.estatisticas)

// roteamento de patch_notes
router.get('/atualizacoes', mustBeLoggedIn, userController.patchNotes)

//roteamento de SESSÃO
router.post('/login', sessaoController.login)
router.get('/logout', sessaoController.logout)

//roteamento de cursos
router.get('/recuperarCursos', cursosController.recuperarCursos);

//roteamento de post
router.get('/postAcs', mustBeLoggedIn, postController.postACs)
router.get('/postAes', mustBeLoggedIn, postController.postAEs)
router.post('/uploadACs', mustBeLoggedIn, multer(multerConfig).single('certificados'), certificationController.uploadCertification);
router.post('/uploadAEs', mustBeLoggedIn, multer(multerConfig).single('certificados'), certificationController.uploadCertification);

//roteamento de certificados
router.get('/atividadesComplementares', mustBeLoggedIn, certificadosAcsController.getAllAcs)
router.get('/extensao', mustBeLoggedIn, certificadosAesController.getAllAes)
router.get('/mostrar_ac/:id_uploaded', mustBeLoggedIn, certificadosAcsController.getByIdAc)
router.get('/mostrar_ae/:id_uploaded', mustBeLoggedIn, certificadosAesController.getByIdAe)
router.get('/apagarCertificadoACs/:id_uploaded/:key_name', mustBeLoggedIn, certificadosAcsController.apagarCertificadoAcs)
router.get('/apagarCertificadoAEs/:id_uploaded/:key_name', mustBeLoggedIn, certificadosAesController.apagarCertificadoAes)

//roteamento JSON
router.get('/cursos_json/:id_course_types', requisicoesJsonController.cursos_json)
router.get('/subcategorias_json/:name_activity_type', requisicoesJsonController.subcategorias_json)
router.get('/horas_json/:email', requisicoesJsonController.horas_json)

/**
 * Validando as rotas
 */
router.post('/certification', certificationController.uploadCertification);

//exemplo de monitoramento de erro com SENTRY
router.get('/debug-sentry', (req, res) => { throw new Error("Exemplo de erro") })

module.exports = router