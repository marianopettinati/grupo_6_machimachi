// Acá nos falta express y el router
const express = require ('express');
const router = express.Router();

// Aća nos falta traer el controller
const cartController = require ('../controllers/cartController');

// Acá definimos las rutas
router.get('/productCart', cartController.cart);

// Acá exportamos el resultado
module.exports = router;