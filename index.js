//  EL LADO DEL SERVIDOR
const Server = require("./models/server");

require('dotenv').config()
// Vinculamos a una clase
const server = new Server();

server.execute();


//  Cuando un cliente se conecta
//     /**
//      * console.log("Cliente conectado!")
//      * console.log(socket.id)
//      *  Emite un evento 
//      * socket.emit('Mensaje-bienvenida', 'Bienvenido al server')
//      * socket.emit('Mensaje-bienvenida', {
//      *      Enviar un objeto literal
//      *     msg: 'Bienvenido al server',
//      *     fecha: new Date()
//      * })

//      *  Escuhar el evento
//      * socket.on('mensaje-cliente', (data) => {
//      *     console.log(data)
//      * })
//      * */

