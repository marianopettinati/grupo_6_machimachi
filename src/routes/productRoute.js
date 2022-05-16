const express = require ('express');
const router = express.Router();
//const { path } = require('express/lib/application');
const path = require ('path');
const multer = require ('multer');
const productController = require ('../controllers/productController');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, path.join(__dirname, '../../public/images')); 
    }, 
    filename: function (req, file, cb) { 
       const nombreDeImg = file.fieldname + Date.now() + path.extname(file.originalname);
       cb(null, nombreDeImg);
    }
  });

const uploadFile = multer({ storage });

//router.get ('/', productController.product);
router.get ('/ninos', productController.productsNiños);
router.get ('/ninas', productController.productsNiñas);
router.get ('/sale', productController.saleProducts);

//procesamiento POST
router.get ('/new', productController.newProduct);
router.post ('/new', uploadFile.single('product-img'), productController.postProduct);

//procesamiento PUT y DELETE
router.get ('/edit/:id', productController.editProduct);
router.put ('/edit/:id', productController.putProduct);  //TO DO
router.delete ('/edit/:id', productController.deleteProduct);

//GET
router.get ('/:id', productController.getProduct);


module.exports = router;