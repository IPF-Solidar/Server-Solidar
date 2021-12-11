const ctrlPublic = {};
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
    const { titulo, descripcion,departamento,objetivo,urlYoutube,numeroContacto,cvu,emailC,mpMercadoPago,mpCriptomonedas,fechaFinal} = req.body;
    // Se alamacena el nuevo usuario en la base de datos
    const autor= req.usuario._id;

    const publicacion = new Public({autor,titulo, descripcion,departamento,objetivo,urlYoutube,numeroContacto,cvu,emailC,mpMercadoPago,mpCriptomonedas,fechaFinal});

    if(req.file){
        const { filename }= req.file
        publicacion.setImgUrl(filename) 
    }

    await publicacion.save() 


    

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