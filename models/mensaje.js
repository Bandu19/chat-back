const { Schema, model } = require('mongoose')


//Manejar todo el historial del Chat
const MensajeSchema = Schema({

    // La persona que esta mandando el mensaje.
    de: {
        // Es una referencia
        type: Schema.Types.ObjectId, // id Mongo
        ref: 'Usuario',
        // Es requirido:
        required: true
    },

    // La persona que esta recibira el mensaje.
    para: {
        // Es una referencia
        type: Schema.Types.ObjectId, // id Mongo
        ref: 'Usuario',
        required: true
    },

    // El mensaje que yo quiero enviar.
    mensaje: {
        type: String,
        require: true
    },
    flag: {
        type: Boolean,
        default: false
    }

}, {
    // Esto va adicional la fecha de creacion y ultima modificacion
    timestamps: true
})


MensajeSchema.method('toJSON', function () {

    // Desestructuramos la version de MONGO, su ID de la base de datos
    const { __v, ...object } = this.toObject()
    // Crea una propiedad "uid" y guarda ahi el identificador de la base de datos
    return object
})


module.exports = model('Mensaje', MensajeSchema)


