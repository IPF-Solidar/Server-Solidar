const { model, Schema } = require("mongoose");

const ComentariosSchema = new Schema({
    fecha: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    }
})

module.exports = model('Comentarios', ComentariosSchema)