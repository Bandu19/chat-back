const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje, contadorNotificacion } = require('../controllers/sockets');
const { comprobarJWT } = require('../helpers/jwt');
const TicketList = require('./ticket-list');

class Sockets {

    constructor(io) {
        // Este hace que se actualize todo los navegadores (Al instante)
        this.io = io;

        // Crear nuestra instancia

        // this.bandList = new BandList();

        this.ticketList = new TicketList();


        this.socketExports()
    }


    socketExports() {

        // On connection
        this.io.on('connection', async (socket) => {

            // console.log(socket.handshake.query['x-token']) // Nos manda en consola el token de cada usuario
            // Desestructurar el Arreglo retornado
            const [valido, uid] = comprobarJWT(socket.handshake.query['x-token'])

            if (!valido) {
                console.log('socket no identificado')
                return socket.disconnect()
            }
            console.log('Cliente conectado', uid)

            await usuarioConectado(uid)
            // const usuario = await usuarioConectado(uid) ==> Opcional
            // console.log(usuario.nombre)

            // Unir al usuario a una sala de socket.io
            socket.join(uid)

            // Emitir al cliente conectado, todas las bandas actuales.

            // Validar el JWT
            // Si el token no es valido, desconectar

            // Saber que usuario esta activo mediante el UID

            // ** Emitir todos los usuarios conectados
            //    Actualiza el estado de todos los usuarios
            this.io.emit('lista-usuarios', await getUsuarios())


            // Socket join, uid

            // Escuchar cuando el cliente manda un mensaje
            socket.on('mensaje-personal', async(payload)=>{
                // console.log(mensaje)
                
                const mensajePersonal = await grabarMensaje(payload)
                console.log(mensajePersonal)
                
                const contador = await contadorNotificacion(mensajePersonal.de, mensajePersonal.para)
                console.log(contador)

                // RECIBE
                this.io.to(payload.para).emit('mensaje-personal',mensajePersonal)
                // MANDA
                this.io.to(payload.de).emit('mensaje-personal',mensajePersonal)
                
                
                // const notificacion = await getNotificaciones(payload) // Guarda nuestras notificaciones
                // console.log(notificacion)
                this.io.to(payload.para).emit('notificacion-personal',{contador,mensajePersonal})

            })
            // mensaje-personal

            // Disconnect
            // Marcar en la BD que el usuario se desconecto


            // Emitir todos los usuarios conectados

            socket.on('disconnect', async () => {
                console.log('cliente desconectado', uid)
                await usuarioDesconectado(uid)
                // Actualiza el estado de todos los usuarios
                this.io.emit('lista-usuarios', await getUsuarios())
            })


        })






    }

}

module.exports = Sockets;