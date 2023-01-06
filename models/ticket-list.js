const Ticket = require('./ticket')

class TicketList {

    constructor() {
        this.ultimoNumero = 0

        this.pendientes = []
        this.asignados = []
    }


    get siguienteNumero() {
        this.ultimoNumero++
        return this.ultimoNumero
    }

    get ultimos13() {
        return this.asignados.slice(0, 13)
    }

    // CREAR EL TICKET
    crearTicket() {
        const nuevoTicket = new Ticket(this.siguienteNumero)
        this.pendientes.push(nuevoTicket)
        return nuevoTicket
    }

    // RELLENAR LOS CAMPOS AGENTE Y ESCRITORIO
    asignarTicket(agente, escritorio) {

        // MEDIDA DE SEGURIDAD

        // Si pendientes esta vacio me retorna null para no romper el codigo
        if (this.pendientes.length === 0) {
            return null
        }

        // Elimina el primer elemento del array
        const siguienteTicket = this.pendientes.shift()

        // Rellenar los campos vacios como el agente y el escritorio
        siguienteTicket.agente = agente
        siguienteTicket.escritorio = escritorio

        console.log(siguienteTicket)
        // Dentro de los asignados toma el primer valor de los pendientes
        this.asignados.unshift(siguienteTicket)

        return siguienteTicket
    }
}
module.exports = TicketList;