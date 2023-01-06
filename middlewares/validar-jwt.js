const jwt = require('jsonwebtoken')

const validarJWT = (req, res, next) => {

    try {

        // Extrayendo desde POSTMAN que envia el token
        const token = req.header('x-token')


        // verificación del token

        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'No hay token en la petición'
            })
        }

        const { uid } = jwt.verify(token, process.env.JWT_KEY)

        req.uid = uid

        // res.json({
        //     ok: true,
        //     payload
        // })

        next()

    } catch (error) {
        res.status(401).json({

            ok: false,
            msg: 'Token no es válido'

        })
    }

}


module.exports = {
    validarJWT
}