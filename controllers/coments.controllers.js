const ctrlComents = {};
// Requerimos el modelo de datos de usuario 
const Comentarios = require('../models/comentarios');




// Devuelve todos los comentarios  de la colección
ctrlComents.rutaGet = async (req, res) => {
    const comentarios = await Comentarios.find().populate('autor',['nombre','apellido']) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(comentarios);
}
/* ctrlComents.rutaGetPublic = async (req, res) => {
    const comentarios = await Comentarios.find().populate('autor',['nombre','apellido']) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(comentarios);
} */

// Controlador que almacena un nuevo usuario
ctrlComents.rutaPost = async (req, res) => {
    // Desestructuramos la información recibida del cliente
   const {public, fecha, descripcion} = req.body;
   // Se alamacena el nuevo usuario en la base de datos

   const autor= req.usuario._id;
   const comentarios = new Comentarios({autor, public,fecha, descripcion});
   await comentarios.save() 

   res.json({msg: 'El usuario se creo correctamente'});
}

module.exports = ctrlComents;