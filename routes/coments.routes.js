// Utilizamos el método Router de la librería express
const router = require('express').Router();
const { body } = require('express-validator');
const {validar_jwt} = require('../middlewares/validar_jwt')
const { validarCampos } = require ('../helpers/validar_campos');
const upload = require('../libs/storage')
/* 
const {verficarAdmin} = require('../middlewares/validar_roles')
const { siExisteRol, siExisteEmail } = require ('../middlewares/Validaciones'); */


// Requerimos los controladores (funciones que contendrán la lógica del endpoint)
 const {
     rutaGet, rutaPost/* , rutaGetPublic *//* , rutaPut, rutaDelete */
 } = require('../controllers/coments.controllers')

//  Ruta para obtener todos las publicaciones
router.get('/api/get-comentarios',
rutaGet)

// Ruta para guardar las publicaciones
router.post('/api/create-comentarios',
validar_jwt,
rutaPost)

/* router.get('/api/get-comentariosUnicos',
rutaGetPublic) */

/* // Actualizar las publicaciones
router.put('/api/edit-Comentario/:id',
validar_jwt,
rutaPut)

// Ruta para eliminar las publicaciones
router.delete('/api/delete-Comentario/:id',
rutaDelete) */


module.exports = router;