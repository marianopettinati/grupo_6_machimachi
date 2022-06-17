const express = require ('express');
const router = express.Router();
const path = require ('path');
const multer = require ('multer');
const productController = require ('../controllers/productController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, path.join(__dirname, '../../public/images')); 
    }, 
    filename: function (req, file, cb) { 
       const nombreDeImg = file.originalname;
       cb(null, nombreDeImg);
    }
  });

const uploadFile = multer({ storage });

//router.get ('/', productController.product);
router.get ('/ninos', productController.productsNiños);
router.get ('/ninas', productController.productsNiñas);
router.get ('/sale', productController.saleProducts);

//GET listado para administrador
router.get ('/list', adminMiddleware, productController.getProductList)

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