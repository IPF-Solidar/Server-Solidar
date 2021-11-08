const { model, Schema } = require('mongoose');

const PublicarSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    resumen: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },
    imagen: {

    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFinal: {
        type: Date,
        required: true
    }
});
module.exports = model('Publicar', PublicarSchema);