const { model, Schema } = require('mongoose');

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
        default: 'https://cdn-icons-png.flaticon.com/512/147/147144.png'
    },
    activo: {
        type: Boolean,
        default: true
    }
});


module.exports = model('User', UserSchema);