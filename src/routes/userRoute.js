const express = require ('express');
const router = express.Router();
const path = require ('path');
const multer = require ('multer');
const validaciones = require('../middlewares/validationUtils');
const guestMiddleware = require ('../middlewares/guestMiddleware');
const authMiddleware = require ('../middlewares/authMiddleware');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, path.join(__dirname, '../../public/images/users')); 
    }, 
    filename: function (req, file, cb) { 
       const nombreDeImg = file.fieldname + Date.now() + path.extname(file.originalname);
       cb(null, nombreDeImg);
    }
  });

const uploadFile = multer({ storage });


const loginController = require ('../controllers/userController');


router.get('/login', guestMiddleware, loginController.viewLogin);

router.post('/login', validaciones.validacionesLogin, loginController.login);

router.get('/register', guestMiddleware, loginController.viewRegister);

router.post('/register', uploadFile.single('userImg'), validaciones.validacionesRegister, loginController.createUser);

router.get('/forgotpassword', loginController.viewForgotPassword);

router.get('/profile', authMiddleware, loginController.viewProfile);

router.post('/logout', loginController.logout);


module.exports = router;