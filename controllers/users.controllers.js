const ctrlHome = {};
// Requerimos el modelo de datos de usuario 
const User = require('../models/User');

const {generar_jwt} = require('../helpers/generar_jwt')


// Devuelve todos los usuarios activos de la colección
ctrlHome.rutaGet = async (req, res) => {
    const users = await User.find({ activo: true }) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(users);
}


ctrlHome.rutaGetUnico = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Ejecución normal del programa
       const usuario=  await User.findById(id)

       //respuesta del servidor
       res.json(usuario);
    } catch (error) {
        // Si ocurre un error 
        console.log('Error al mostrar el usuario: ', error)
    }
};


ctrlHome.rutaGetPerfil = async (req, res) => {
    const { email} = req.params;
    try {
        // Ejecución normal del programa
       const usuario=  await User.findOne({email})

       //respuesta del servidor
       res.json(usuario);
    } catch (error) {
        // Si ocurre un error 
        console.log('Error al mostrar el usuario: ', error)
    }
}


// Controlador que almacena un nuevo usuario
ctrlHome.rutaPost = async (req, res) => {
     // Desestructuramos la información recibida del cliente
    const { nombre,apellido,dni,fecha_nacimiento,domicilio,email, password} = req.body;
    // Se alamacena el nuevo usuario en la base de datos
    const user = new User({nombre,apellido,dni,fecha_nacimiento,domicilio,email, password});
    await user.save() 

    res.json({msg: 'El usuario se creo correctamente'});
}

// Controlador para login del usuario y devolver un token
ctrlHome.rutaLogin = async (req, res) => {
    const { email, password} = req.body;
   // console.log(email,password)
    const user = await User.findOne({email, password});
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
    
    const correo = user.email
    const nombre = user.nombre
    const apellido = user.apellido
    const perfil = user.fotoPerfil
    res.json({
        token,
        correo,
        nombre,
        apellido,
        perfil
           //se envia el token generado
    }); 
}


// Controlador que actualiza información de los usuarios
ctrlHome.rutaPut = async (req, res) => {
    const { nombre,apellido,dni,fecha_nacimiento,domicilio,email, password, id } = req.body

    const user = await User.findByIdAndUpdate(id, {nombre,apellido,dni,fecha_nacimiento,domicilio,email, password}, { new: true })
   
    res.json({
        msg: 'Usuario actualizado correctamente',
        user
    })
}

// Controlador para eliminar un usuario de la BD físicamente
ctrlHome.rutaDelete = async (req, res) => {
    const { id } = req.body;
    
    try {
        // Ejecución normal del programa
        await User.findByIdAndDelete(id)

        res.json({
            msg: 'Usuario eliminado correctamente'
        })
    } catch (error) {
        // Si ocurre un error 
        console.log('Error al eliminar el usuario: ', error)
    }
};

// Cambiar el estado activo de un usuario (Eliminación lógica)
ctrlHome.deleteUser = async (req, res) => {
    const { id }  = req.body
    const user = await User.findByIdAndUpdate(id, { activo: false }, { new: true });

    // Respuesta del servidor
    res.json({
        msg: 'Usuario eliminado correctamente',
        user
    });
}





module.exports = ctrlHome;