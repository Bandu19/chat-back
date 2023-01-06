const { response } = require("express")
const bcrypt = require("bcryptjs")
const Usuario = require("../models/usuario")
const { generarJWT } = require("../helpers/jwt")

// Crear nuevos Usuarios

// Creación por medio SERVICIOS REST

/**
 *  El async sirve para antes de enviar el res, 
 *  esperemos respuesta de la ( Base de datos)
 */
const CrearUsuario = async (req, res = response) => {

    try {

        const { email, password } = req.body // Recibe datos 

        // verificar que el email no exista

        const existeEmail = await Usuario.findOne({ email })

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            })
        }


        const usuario = new Usuario(req.body)

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync() // De manera sincrona
        
        usuario.password = bcrypt.hashSync(password, salt)

        // Guardad usuario en BD
        await usuario.save()


        // Generar el JWT
        // No se almacena en el back el JWT

        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

// ** Login
const login = async (req, res) => {

    const { email, password } = req.body // Recibe datos 

    try {

        // Verificar si existe el correo
        const usuarioDB = await Usuario.findOne({ email })
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        // Validar el password

        const validPassword = bcrypt.compareSync(password, usuarioDB.password)
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Password no es correcto'
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuarioDB.id)


        // pone los nuevos datos en REST
        res.json({
            ok: true,
            usuario: usuarioDB,
            token

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

// Revalidar Token
const renewToken = async (req, res) => {

    const uid = req.uid

    // Generar un nuevo JWT

    const token = await generarJWT(uid)

    // Obtener el usuario por medio del UID

    const usuario = await Usuario.findById(uid)

    res.json({
        ok: true,
        usuario,
        token
    })
}

module.exports = {
    CrearUsuario,
    login,
    renewToken

}