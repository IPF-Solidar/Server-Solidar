const ctrlPublic = {};
const { body } = require('express-validator');
// Requerimos el modelo de datos de usuario 
const Public = require('../models/publicaciones');




// Devuelve todos las publicaciones activas de la colección
ctrlPublic.rutaGet = async (req, res) => {
    const publicaciones = await Public.find().populate('autor',['nombre','apellido']); // consulta para todos los documentos
    /* const publicaciones = await Public.find().populate('userId','nombre','apellido'); */
    
    // Respuesta del servidor
    res.json(publicaciones);
}

ctrlPublic.rutaGetUnico = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Ejecución normal del programa
       const publicaciones=  await Public.findById(id)

       //respuesta del servidor
       res.json(publicaciones);
    } catch (error) {
        // Si ocurre un error 
        console.log('Error al mostrar el usuario: ', error)
    }
};



// Controlador que almacena una nueva publicacion
ctrlPublic.rutaPost = async (req, res) => {
     // Desestructuramos la información recibida del cliente
     console.log(req.body);
    const { titulo, descripcion,departamento,objetivo,urlYoutube,fechaFinal} = req.body;
    // Se alamacena el nuevo usuario en la base de datos
   
    const autor= req.usuario._id;


    const publicacion = new Public({autor,titulo, descripcion,departamento,objetivo,urlYoutube,fechaFinal});

    if(req.file){
        const { filename }= req.file
        publicacion.setImgUrl(filename) 
    }

    await publicacion.save() 

    /* const publica=req.body; */
    /* body.autor = req.usuario._id; */
    /* console.log(publica)
    if(req.file){
        const { filename }= req.file
        publica.setImgUrl(filename) 
    } */

  /*   const publicacion = new Public(publica)
    //console.log(publicacion)
    await publicacion.save(); */

    /* const {
        titulo,
        descripcion,
        objetivo,
        fechaFinal
    } = req.body

    const public = Public({
        titulo,
        descripcion,
        objetivo,
        fechaFinal
    }) */

   /*  if(req.file){
        const { filename }= req.file
        public.setImgUrl(filename) 
    } */

    /* const publicaciones = await public.save()

    res.status(201).send({publicaciones}) */

    

    res.json({msg: 'La publicación se envio correctamente'});
}



// Controlador que actualiza información de las publicaciones
ctrlPublic.rutaPut = async (req, res) => {
    const { titulo,resumen, descripcion, id } = req.body

    const publicacion = await Public.findByIdAndUpdate(id, {titulo,resumen, descripcion}, { new: true })
   
    res.json({
        msg: 'La publicación se actualizado correctamente',
        publicacion
    })
}

// Controlador para eliminar una publicacion de la BD físicamente
ctrlPublic.rutaDelete = async (req, res) => {
    const { id } = req.body;
    
    try {
        // Ejecución normal del programa
        await Public.findByIdAndDelete(id)

        res.json({
            msg: 'Publicación eliminada correctamente'
        })
    } catch (error) {
        // Si ocurre un error 
        console.log('Error al eliminar la Publicación: ', error)
    }
};





module.exports = ctrlPublic;