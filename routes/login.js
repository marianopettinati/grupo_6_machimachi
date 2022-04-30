const express = require ('express');
const router = express.Router();

const loginController = require ('../controllers/loginController');


router.get('/login', loginController.login);
router.get ('/register', loginController.register);
router.get ('/forgotpassword', loginController.forgotpassword);
router.get ('/admin/add', loginController.add);


module.exports = router;