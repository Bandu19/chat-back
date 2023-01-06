/**
 *  Definir rutas de mensajes
 *  Path: api/mensaje
 */

const { Router } = require('express')
const { obtenerChat } = require('../controllers/mensajes')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.get('/:de', validarJWT, obtenerChat)


// Nota en devolver Router es asi de esta manera
module.exports = router
