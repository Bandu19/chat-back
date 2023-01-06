// Servidor de Express
const express = require('express');
// Servidor de sockets
const http = require('http');
// Configuración del socket server
const socket = require('socket.io');
// Configurar RUTA para el path
const path = require('path');
// LLamar Archivo .sockets.js
const Sockets = require('./sockets');

const cors = require('cors');


// Exportando la conexion de la DB
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        /* Configuraciones Globales */

        //Llamando al Servidor Express
        this.app = express()
        this.port = process.env.PORT

        // Conectar a DB
        dbConnection();

        // Http server
        this.server = http.createServer(this.app)

        // Configuraciones de los sockets
        this.io = socket(this.server, {/* Configuraciones */ })

        // Inizializar Sockets
        this.sockets = new Sockets(this.io)
    }

    /* Metodos */

    middlewares() {
        // Desplegar el directorio Publico
        this.app.use(express.static(path.resolve(__dirname, '../public')))

        // PRIMERO SON LAS CORS
        // CORS ==> RESTRINGIR DOMINIOS, HACER CAMBIOS EN LOS DOMINIOS
        this.app.use(cors());


        // Parseo del body
        this.app.use(express.json())

        // SEGUNDA SON LOS ENPOINTS
        // Aqui se crea las rutas de tus path
        this.app.use('/api/login', require('../router/auth'))
        this.app.use('/api/mensajes', require('../router/mensajes'))
        this.app.use('/api/contador', require('../router/contador'))

    }


    // configurarSockets() {
    //     new Sockets(this.io)
    // }


    execute() {
        // Inicializar
        this.middlewares()

        // Inicializar los Sockets
        // this.configurarSockets() NO SE OCUPA POR EL MOMENTO


        // Inicializar Server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en un puerto', this.port);
        });
    }
}

module.exports = Server;