const express = require ('express');
const router = express.Router();
const { body } = require('express-validator');
const loginController = require ('../controllers/userController');
const guestMiddleware = require ('../middlewares/guestMiddleware');
const authMiddleware = require ('../middlewares/authMiddleware');


//Express Validator - validaciones:
const validaciones = [
    body('email').notEmpty().withMessage("Debes completar tu correo").bail()
        .isEmail().withMessage("Debes completar un email válido"),
    body('password').notEmpty().withMessage("Debes ingresar tu contraseña")
];

router.get('/login', guestMiddleware, loginController.getLogin);
router.post ('/login', validaciones, loginController.postLogin);

router.get ('/register',guestMiddleware, loginController.register);
router.get ('/forgotpassword', loginController.forgotpassword);
router.get ('/profile', authMiddleware, loginController.profile);
router.get ('/logout', loginController.logout);
//router.get ('/admin/add', loginController.add);


module.exports = router;