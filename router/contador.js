/**
 *  Definir rutas de mensajes
 *  Path: api/mensaje
 */

const { Router } = require('express')
const { obtenerContador } = require('../controllers/obtenerContador')
// const { validarJWT } = require('../middlewares/validar-jwt')


const router = Router()


// Contador Token
router.get('/contadorDE', obtenerContador)


module.exports = router