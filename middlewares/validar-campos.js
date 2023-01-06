/**
 *  Middleware personalizados para ValidarCampos
 */
const { validationResult } = require("express-validator")

const validarCampos = (req, res, next) => {
    // El next es una función que hace que continue

    const errores = validationResult(req)

    // Si los errores no estan vacios
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        })
    }

    // Continue con el sig. Middleware

    next()
}


module.exports = {
    validarCampos
}