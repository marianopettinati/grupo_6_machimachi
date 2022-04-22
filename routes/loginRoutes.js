// Acá nos falta express y el router
const express = require ('express');
const router = express.Router();

// Aća nos falta traer el controller
const loginController = require ('../controllers/loginController');

// Acá definimos las rutas
router.get('/login', loginController.login);
router.get ('/register', loginController.register);
router.get ('./forgotpassword', loginController.forgotpassword);

// Acá exportamos el resultado
module.exports = router;