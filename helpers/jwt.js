const jwt = require('jsonwebtoken')

// Generas el token.
const generarJWT = (uid) => {

    // Se trabjara en forma de promesas
    return new Promise((resolve, reject) => {

        const payload = { uid }

        jwt.sign(payload, process.env.JWT_KEY, {

            expiresIn: '24h'

        }, (err, token) => {

            if (err) {
                console.log(err)
                reject('No se pudo generar el JWT token')
            } else {
                resolve(token)
            }

        })
    })
}


// Comprobar el Token
const comprobarJWT = (token = '') => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY)
        return [true, uid]

    } catch (error) {
        return [false, null]
    }
}


module.exports = {
    generarJWT, comprobarJWT
}