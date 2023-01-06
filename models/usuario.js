const { Schema, model } = require('mongoose')


// Nuestro Esquema del Usuario para utilizarlo en servicios REST
const UsuarioSchema = Schema({

    nombre: {
        // Que tipo es:
        type: String,
        // Es requirido:
        required: true
    },
    email: {
        // Que tipo es:
        type: String,
        // Es requirido:
        required: true,
        // Es unico el valor
        unique: true
    },
    password: {
        // Que tipo es:
        type: String,
        // Es requirido:
        required: true,
    },
    online: {
        type: Boolean,
        default: false
    }

})


UsuarioSchema.method('toJSON', function () {

    // Desestructuramos la version de MONGO, su ID de la base de datos
    const { __v, _id, password, ...object } = this.toObject()

    // Crea una propiedad "uid" y guarda ahi el identificador de la base de datos
    object.uid = _id

    return object
})


module.exports = model('Usuario', UsuarioSchema)


