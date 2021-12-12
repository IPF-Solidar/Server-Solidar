const { model, Schema } = require("mongoose");
const {} = require('./User');
const {} = require('./publicaciones');

const ComentariosSchema = new Schema({

    autor:{ type: Schema.Types.ObjectId , ref:"User"},
    public:{ type: Schema.Types.ObjectId , ref:"Publicacion"},
    
    fecha: {
        type: Date,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    }
})

module.exports = model('Comentarios', ComentariosSchema)