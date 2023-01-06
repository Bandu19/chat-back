const Mensaje = require("../models/mensaje");

const obtenerChat = async (req, res) => {
    console.log(req)
    // Aqui extraemos el ID del usuario
    const miID = req.uid;

    // Aqui extraemos el Usuario quien recibimos
    const mensajesDE = req.params.de

    // Condicion para obtener todos los mensajes de la BD
    const last30 = await Mensaje.find({
        // Condicion no tan sencilla
        // Deve regresar un Registro
        $or: [
            // si es:
            { de: miID, para: mensajesDE},
            // o si:
            { de: mensajesDE, para: miID}
        ]

    })
        //Registros deven ser ordenados de manera desendente
        .sort({ created: 'desc' })
        //Ultimos 30 registros
        .limit(30)


    // cuand haya mas de 30 mensajes imprime los ultimos mensajes 
    const last30Reverse = last30.reverse();

    res.json({
        ok: true,
        mensajes: last30Reverse
    })
}

module.exports = {
    obtenerChat
}