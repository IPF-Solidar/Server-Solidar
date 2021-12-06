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
     rutaGet,rutaGetUnico, rutaPost, rutaPut, rutaDelete
 } = require('../controllers/public.controllers')

//  Ruta para obtener todos las publicaciones
router.get('/api/get-publicaciones',
rutaGet)

router.get('/api/get-publicaciones/:id',
rutaGetUnico)

// Ruta para guardar las publicaciones
router.post('/api/create-publicacion',upload.single('image'),
validar_jwt,
rutaPost)

// Actualizar las publicaciones
router.put('/api/edit-publicacion/:id',
validar_jwt,
rutaPut)

// Ruta para eliminar las publicaciones
router.delete('/api/delete-publicacion/:id',

rutaDelete)


module.exports = router;
