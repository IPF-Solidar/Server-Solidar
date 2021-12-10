const { model, Schema } = require('mongoose');
const {} = require('./User');
const { appConfig } = require('../config')

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
    imgUrl: {
        type: String,
    },
    departamento: {
        type: String,
        required: true
    },
    objetivo: {
        type: Number,
        required: true
    },
    urlYoutube: {
        type: String,
        default:null,
    },
    fechaFinal: {
        type: Date,
        required: true
    },
    dineroActual: {
        type: Number,
        default:0
    },
    activo: {
        type: Boolean,
        default: true
    }
    
    

});

PublicarSchema.methods.setImgUrl = function setImgUrl (filename) {
    const {host, port } = appConfig
    this.imgUrl = `${host}:${port}/public/${filename}`
}
module.exports = model('Public', PublicarSchema);