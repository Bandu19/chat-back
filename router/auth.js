/**
 *  Definir rutas de autenticación
 *  path: api/login
 */

const { Router } = require('express')
const { check } = require('express-validator')
const { CrearUsuario, login, renewToken } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()


// Crear nuevos Usuarios

router.post('/new', [

    check('nombre', "El nombre es obligatorio").isString(),
    check('password', "El password es obligatorio").not().isEmpty(),
    check('email', "Comprueba que hayas escrito el email correctamente").isEmail(),
    validarCampos

], CrearUsuario)




// Login
router.post('/', [
    /** 
     * El check es un middlewares de si mismo
     * El express-validator sirve para validar campos
    */
    check('email', "El email es obligatorio").isEmail(),
    check('password', "El password es obligatorio").not().isEmpty(),
    validarCampos
], login)

// Revalidar Token
router.get('/renew', validarJWT, renewToken)




module.exports = router