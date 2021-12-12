const { model, Schema } = require('mongoose');
const { appConfig } = require('../config')
//provincia - localidad

const UserSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    dni: {
        type: Number,
        required: true
    },
    fecha_nacimiento: {
        type: String,
        required: true
    },
    domicilio: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'usuario'
    },
    fotoPerfil: {
        type: String,
        default:null
    },
    activo: {
        type: Boolean,
        default: true
    }
});

UserSchema.methods.setImgUrl = function setImgUrl (filename) {
    const {host, port } = appConfig
    this.fotoPerfil = `${host}:${port}/public/${filename}`
}


module.exports = model('User', UserSchema);