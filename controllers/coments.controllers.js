const ctrlComents = {};
// Requerimos el modelo de datos de los comentarios
const Comentarios = require('../models/comentarios');




// Devuelve todos los comentarios  de la colección
ctrlComents.rutaGet = async (req, res) => {
    const comentarios = await Comentarios.find().populate('autor',['nombre','apellido','fotoPerfil']) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(comentarios);
}

ctrlComents.rutaGetPublic = async (req, res) => {
    /* console.log(req) */
    const {public} = req.params;
    const comentarios = await Comentarios.find({public}).populate('autor',['nombre','apellido','fotoPerfil']) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(comentarios);
}

// Controlador que almacena un nuevo comentario
ctrlComents.rutaPost = async (req, res) => {
    // Desestructuramos la información recibida del cliente
   const {idPublicacion, fecha, descripcion} = req.body;
   // Se alamacena el nuevo comentario en la base de datos

   const autor= req.usuario._id;
   const public = idPublicacion
   const comentarios = new Comentarios({autor,public,fecha, descripcion});
   await comentarios.save() 
   
   res.json({msg: 'El comentario se creo correctamente'});
}

module.exports = ctrlComents;