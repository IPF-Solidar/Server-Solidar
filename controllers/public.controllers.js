const ctrlPublic = {};
// Requerimos el modelo de datos de usuario 
const Public = require('../models/publicaciones');

/* const {generar_jwt} = require('../helpers/generar_jwt') */


// Devuelve todos los usuarios activos de la colección
ctrlPublic.rutaGet = async (req, res) => {
    const publicaciones = await Public.find({ activo: true }) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(publicaciones);
}



// Controlador que almacena un nuevo usuario
ctrlPublic.rutaPost = async (req, res) => {
     // Desestructuramos la información recibida del cliente
    const { titulo,resumen, descripcion,imagen,fechaInicio,fechaFinal} = req.body;
    // Se alamacena el nuevo usuario en la base de datos
    const publicacion = new Public({titulo,resumen, descripcion,imagen,fechaInicio,fechaFinal});
    await publicacion.save() 

    res.json({msg: 'La publicación se envio correctamente'});
}

// Controlador para login del usuario y devolver un token
/* ctrlPublic.rutaLogin = async (req, res) => {
    const { email, password} = req.body;
   // console.log(email,password)
    const user = await Public.findOne({email, password});
   //console.log(user)
   
    //Si no encuentra el usuario
    if(!user){
        return res.status(401).json({
            msg: "Usuario no existe"
        })
    };

    //verificamos si es un usuario activo
    if(!user.activo){
        res.status(401).json({
            msg: "Usuario no existe"
        })
    }

    //Si lo encuentra
    // Generar el token
    const token = await generar_jwt(user.id); 
    
    res.json({
        token     //se envia el token generado
    }); 
} */


// Controlador que actualiza información de los usuarios
ctrlPublic.rutaPut = async (req, res) => {
    const { titulo,resumen, descripcion,imagen, id } = req.body

    const publicacion = await Public.findByIdAndUpdate(id, {titulo,resumen, descripcion,imagen}, { new: true })
   
    res.json({
        msg: 'La publicación se actualizado correctamente',
        publicacion
    })
}

// Controlador para eliminar un usuario de la BD físicamente
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

// Cambiar el estado activo de un usuario (Eliminación lógica)
/* ctrlPublic.deleteUser = async (req, res) => {
    const { id }  = req.body
    const publicacion = await Public.findByIdAndUpdate(id, { activo: false }, { new: true });

    // Respuesta del servidor
    res.json({
        msg: 'Publicación eliminada correctamente',
        publicacion
    });
} */





module.exports = ctrlPublic;