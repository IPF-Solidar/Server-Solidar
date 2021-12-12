// Importamos las librerías
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Inicializamos
require('dotenv').config();
require('./connection');
const app = express();



// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/public',express.static(`${__dirname}/storage/imgs`))

// Setttings
app.set('port', process.env.PORT || 4000);



// Routes
app.use(require('./routes/user.routes'));
app.use(require('./routes/public.routes'));
app.use(require('./routes/coments.routes'));



////////////////////////////// Mercado Pago ///////////////////////////////////////////
// SDK de Mercado Pago
const mercadopago = require ('mercadopago');


// Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-6623451607855904-111502-1f258ab308efb0fb26345a2912a3cfa5-672708410'
  });

//routes
app.post('/checkout', (req, res) => {
// Crea un objeto de preferencia
/* var precio = parseInt(req.body.price) + 500; */
/* const local = 'http://localhost:3000/' */
let preference = {
    items: [
      {
        title:req.body.title,
        unit_price: parseInt(req.body.price),
        quantity: 1,
      }
    ]
  };

  //console.log(preference)
  
  mercadopago.preferences.create(preference)
  .then(function(response){
    console.log(response)
    res.redirect(response.body.init_point);
   
  }).catch(function(error){
    console.log(error);
  });
});
////////////////////////////// Mercado Pago ///////////////////////////////////////////

//Ponemos el servidor en escucha...
app.listen(app.get('port'), ()=> console.log(`Server en linea en el puerto: ${app.get('port')}`))