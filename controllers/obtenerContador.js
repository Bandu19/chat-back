const mensaje = require("../models/mensaje")


const obtenerContador = async (req, res) => {
    console.log(req)
    const { deID, paraID } = req.body

    try {
        const notificaciones = await mensaje
            .find({ flag: false, de: deID, para: paraID })
            .count()

        console.log("RESULTADDO DE CONTROLLERS", notificaciones)

        res.json({
            ok:true,
            de:deID,
            para:paraID,
            usuarioCont: notificaciones
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    obtenerContador
}