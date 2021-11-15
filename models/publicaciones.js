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
        type: String,
        required: true
    },
    fechaFinal: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    }
});
module.exports = model('Public', PublicarSchema);