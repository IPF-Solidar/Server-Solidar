// Utilizamos el método Router de la librería express
const router = require('express').Router();

const {validar_jwt} = require('../middlewares/validar_jwt')
const {verficarAdmin} = require('../middlewares/validar_roles')
const { body } = require('express-validator');
const { validarCampos } = require ('../helpers/validar_campos');
const { siExisteRol, siExisteEmail } = require ('../middlewares/Validaciones');


// Requerimos los controladores (funciones que contendrán la lógica del endpoint)
 const {
     rutaGet,rutaGetUnico,rutaGetPerfil, rutaPost, rutaLogin, rutaPut, rutaDelete, deleteUser
 } = require('../controllers/users.controllers')


//  Ruta para obtener todos los usuarios
router.get('/api/get-user', 
validar_jwt,
rutaGet)

router.get('/api/get-user/:id',
validar_jwt,
rutaGetUnico)

router.get('/api/get-perfil/:email',

rutaGetPerfil)


// Ruta para guardar un usuario
router.post('/api/create-user',

body('nombre','El nombre es incorrecto')
.not()
.isEmpty()
,
body('apellido','El apellido es incorrecto')
.not()
.isEmpty()
,
body('dni','El dni es incorrecto')
.not()
.isEmpty()
.isNumeric()
.isLength({min: 7})
,
body('fecha_nacimiento','La fecha de nacimiento es incorrecta')
.not()
.isEmpty()
,
body('domicilio','El domicilio es Incorrecto')
.not()
.isEmpty()
,
body('email','El email es incorrecto')
.not()
.isEmpty()
.isEmail()
.custom(siExisteEmail)
,
body('password','La contraseña debe contener 6 caracteres')
.isLength({min: 6})
.not()
.isEmpty(),
validarCampos,
rutaPost)

router.post('/api/login-user', rutaLogin)

// Actualizar usuarios
router.put('/api/edit-user/:id',
validar_jwt,
body('nombre','El nombre es incorrecto')
.not()
.isEmpty()
,
body('apellido','El apellido es incorrecto')
.not()
.isEmpty()
,
body('dni','El dni es incorrecto')
.not()
.isEmpty()
.isNumeric()
.isLength({min: 7})
,
body('fecha_nacimiento','La fecha de nacimiento es incorrecta')
.not()
.isEmpty()
,
body('domicilio','El domicilio es Incorrecto')
.not()
.isEmpty()
,
body('email','El email es incorrecto')
.not()
.isEmpty()
.isEmail()
,
body('password','La contraseña debe contener 6 caracteres')
.isLength({min: 6})
.not()
.isEmpty(),
validarCampos, 
rutaPut)

// Ruta para eliminar un usuario - actualiza el estado
router.put('/api/desactivar-user/:id',
body('id','La id no es valida').isMongoId(), 
validar_jwt,
deleteUser)


// Ruta para eliminar un usuario
router.delete('/api/delete-user/:id',body('id','La id no es valida').isMongoId(), 
validar_jwt,
verficarAdmin,
rutaDelete)


module.exports = router;
