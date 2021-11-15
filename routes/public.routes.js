// Utilizamos el método Router de la librería express
const router = require('express').Router();

/* const {validar_jwt} = require('../middlewares/validar_jwt')
const {verficarAdmin} = require('../middlewares/validar_roles')
const { body } = require('express-validator');
const { validarCampos } = require ('../helpers/validar_campos');
const { siExisteRol, siExisteEmail } = require ('../middlewares/Validaciones'); */


// Requerimos los controladores (funciones que contendrán la lógica del endpoint)
 const {
     rutaGet, rutaPost, rutaPut, rutaDelete
 } = require('../controllers/public.controllers')

//  Ruta para obtener todos los usuarios
router.get('/api/get-publicaciones', rutaGet)

// Ruta para guardar un usuario
router.post('/api/create-publicacion',rutaPost)

// Actualizar usuarios
router.put('/api/edit-publicacion/:id', rutaPut)

// Ruta para eliminar un usuario
router.delete('/api/delete-publicacion/:id',rutaDelete)


module.exports = router;
