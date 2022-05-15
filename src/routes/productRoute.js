const express = require ('express');
const router = express.Router();
//const { path } = require('express/lib/application');
const path = require ('path');
const multer = require ('multer');
const productController = require ('../controllers/productController');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, path.join(__dirname, '../public/img')); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
  });

const uploadFile = multer({ storage });

//router.get ('/', productController.product);
router.get ('/ninos', productController.productsNiños);
router.get ('/ninas', productController.productsNiñas);

//prcesamiento POST
router.get ('/new', productController.newProduct);
router.post ('/new', uploadFile.single('product-img'), productController.postProduct);


router.get ('/:id/edit', productController.editProduct);
router.put ('/:id/edit', productController.putProduct);
router.delete ('/:id/edit', productController.deleteProduct);

//GET
router.get ('/:id', productController.getProduct);





module.exports = router;