const Band = require('./band');

// LOGICA 
class BandList {

    constructor() {
        this.bands = [
            new Band('Metallica'),
            new Band('Herores del Silencio'),
            new Band('Bon Jovi')
            // new Band('Breaking Benjamin'),
        ]
    }

    // METODOS


    // Agregar una band
    addBand(name) {
        const newBand = new Band(name)

        this.bands.push(newBand)
        return this.bands
    }

    // Eliminar una Band
    removeBand(id) {
        this.bands = this.bands.filter(band => band.id !== id)
    }

    // Obtener las Bands
    getBands() {
        return this.bands
    }

    // Incremento de Votos
    increaseVotes(id) {
        this.bands = this.bands.map(band => {

            if (band.id === id) {
                band.votes += 1;
            }

            return band

        })
    }

    // Actualizar Nombre
    changeNames(id, newName) {
        this.bands = this.bands.map(band => {

            if (band.id === id) {
                band.name = newName;
            }

            return band
        })

    }

}

module.exports = BandList;