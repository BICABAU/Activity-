const express = require('express')
const router = express.Router()

const multer = require('multer')
const multerConfig = require('./config/multer')

const { mustBeLoggedIn } = require('./middlewares/mustBeLoggedIn')

const userController = require('./controllers/userController')
const sessaoController = require('./controllers/sessaoController')
const certificadosAcsController = require('./controllers/certificadosAcsController')
const certificadosAesController = require('./controllers/certificadosAesController')
const postController = require('./controllers/postController')
const requisicoesJsonController = require('./controllers/requisicoesJsonController');
const cursosController = require('./controllers/cursosController');
// const gamificationController = require('./controllers/gamificationController')

//roteamentos do usuário
router.get('/', userController.login_form)
router.get('/home', userController.home)
router.get('/cadastro', userController.cadastro)
router.get('/esqueciASenha', userController.esqueciASenha)
router.get('/perfilDoAluno', mustBeLoggedIn, userController.perfilDoAluno)
router.post('/cadastrar', userController.cadastrar)

router.post('/alterarDados', mustBeLoggedIn, userController.alterarDados)
// ???
router.get('/estatisticas', mustBeLoggedIn, postController.pegarAtividades, userController.estatisticas)
router.get('/estatisticas', mustBeLoggedIn, userController.estatisticas)
// router.get('/ranking', loginVerification, gamificationController.rankingHighlight)

//roteamento de SESSÃO
router.post('/login', sessaoController.login)
router.get('/logout', sessaoController.logout)

//roteamento de cursos
router.get('/recuperarCursos', cursosController.recuperarCursos);

//roteamento de post
router.get('/postAcs', mustBeLoggedIn, postController.postACs)
router.get('/postAcs', mustBeLoggedIn, postController.postAEs)
router.post('/uploadACs', mustBeLoggedIn, multer(multerConfig).single('certificados'), certificadosAcsController.uploadsAcs);
router.post('/uploadAEs', mustBeLoggedIn, multer(multerConfig).single('certificados'), certificadosAesController.uploadAes);

//roteamento de certificados
router.get('/atividadesComplementares', mustBeLoggedIn, certificadosAcsController.getAllAcs, userController.atividadesComplementares)
router.get('/extensao', mustBeLoggedIn, certificadosAesController.getAllAes, userController.extensao)
router.get('/mostrar_ac/:id_certificado', mustBeLoggedIn, certificadosAcsController.getByIdAc)
router.get('/mostrar_ae/:id_certificado', mustBeLoggedIn, certificadosAesController.getByIdAe)
router.get('/apagarCertificadoACs/:nome', mustBeLoggedIn, certificadosAcsController.apagarCertificadoAcs)
router.get('/apagarCertificadoAEs/:nome', mustBeLoggedIn, certificadosAesController.apagarCertificadoAes)

//roteamento JSON
router.get('/cursos_json/:id_tipo_curso_fk', requisicoesJsonController.cursos_json)
router.get('/subcategorias_json/:id_tipo_atividade_acs_fk', requisicoesJsonController.subcategorias_json)

module.exports = router