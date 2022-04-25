// Acá nos falta express y el router
const express = require ('express');
const router = express.Router();

// Traigo los controladores
const mainController = require ('../controllers/mainController');
const loginController = require ('../controllers/loginController');
const cartController = require ('../controllers/cartController');
const productController = require ('../controllers/productController');

// Acá definimos las rutas
//HOME
router.get('/', mainController.home);

//LOGIN - REGISTER - FORGOTPASS
router.get('/login', loginController.login);
router.get ('/register', loginController.register);
router.get ('./forgotpassword', loginController.forgotpassword);

//CARRITO
router.get('/productCart', cartController.cart);

//PRODUCTO
router.get ('/product', productController.product);

// Acá exportamos el resultado
module.exports = router;