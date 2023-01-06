const Usuario = require("../models/usuario")
const Mensaje = require("../models/mensaje")


const usuarioConectado = async (uid) => {
    const usuario = await Usuario.findById(uid)
    // Aqui se actualiza en la base de datos    
    usuario.online = true
    await usuario.save() // Utilidad para la BD

    return usuario
}

const usuarioDesconectado = async (uid) => {
    const usuario = await Usuario.findById(uid)
    usuario.online = false
    await usuario.save() // Utilidad para la BD
    return usuario
}

// Obtener Todos los usuarios
const getUsuarios = async () => {
    const usuarios = await Usuario
        .find()
        .sort('-online')
    return usuarios
}

// Obtener notifiaciones de los usuarios
// const getNotificaciones = async (payload) => { // para, notificacion
//     try{

//         const usuario = await Usuario.findById(payload.para)
//         usuario.notifyc = payload.notificacion
//         await usuario.save()
//         return usuario

//     } catch(error){
//         console.log(error)
//         return false
//     }
// }

// Grabar Mensaje Async
const grabarMensaje = async (payload) => {
    try {
        const mensaje = new Mensaje(payload)
        await mensaje.save()
        return mensaje

    } catch (error) {
        console.log(error)
        return false
    }
}

const contadorNotificacion = async (deID, paraID) => {
    try {
        const notificaciones = await Mensaje
            .find({ flag: false, de: deID, para: paraID })
            .count()

            console.log("RESULTADDO DE CONTROLLERS",notificaciones)
        return notificaciones

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios,
    contadorNotificacion,
    grabarMensaje
}

