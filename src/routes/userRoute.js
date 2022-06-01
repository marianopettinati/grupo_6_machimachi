const express = require ('express');
const router = express.Router();
const validaciones = require('../middleware/validationUtils');
const path = require ('path');
const multer = require ('multer');

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


router.get('/login', loginController.login);

router.get ('/register', loginController.register);

router.post ('/register', uploadFile.single('userImg'), validaciones.validacionesLogin, loginController.processRegister);

router.get ('/forgotpassword', loginController.forgotpassword);

router.get ('/admin/add', loginController.add);


module.exports = router;