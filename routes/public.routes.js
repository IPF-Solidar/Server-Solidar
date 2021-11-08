// Utilizamos el método Router de la librería express
const router = require('express').Router();

/* const {validar_jwt} = require('../middlewares/validar_jwt')
const {verficarAdmin} = require('../middlewares/validar_roles')
const { body } = require('express-validator');
const { validarCampos } = require ('../helpers/validar_campos');
const { siExisteRol, siExisteEmail } = require ('../middlewares/Validaciones'); */


// Requerimos los controladores (funciones que contendrán la lógica del endpoint)
 const {
     rutaGet, rutaPost, rutaLogin, rutaPut, rutaDelete
 } = require('../controllers/users.controllers')

//  Ruta para obtener todos los usuarios
router.get('/api/get-user', rutaGet)

// Ruta para guardar un usuario
router.post('/api/create-user',rutaPost)

router.post('/api/login-user', rutaLogin)

// Actualizar usuarios
router.put('/api/edit-user/:id', rutaPut)


// Ruta para eliminar un usuario
router.delete('/api/delete-user/:id',rutaDelete)


module.exports = router;
