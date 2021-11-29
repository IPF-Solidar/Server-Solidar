const { model, Schema } = require('mongoose');
const {} = require('./User');

const PublicarSchema = new Schema({
    /* Id:{type:Schema.Types.ObjectId, ref: 'User'
    }, */

    autor:{ type: Schema.Types.ObjectId , ref:"User"},

    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFinal: {
        type: Date,
        required: true
    },
    /* objetivo:{
        
    }, */
    activo: {
        type: Boolean,
        default: true
    }/* ,
    comentarios: [
        {
            userId:"",
            descripcion:"",
            fecha:
        }
    ] */

});
module.exports = model('Public', PublicarSchema);