const express = require ('express');
const router = express.Router();
const path = require ('path');
const multer = require ('multer');
const productController = require ('../controllers/productController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validationsMiddleware = require('../middlewares/validationUtils');

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
router.get('/ninos', productController.viewProductsNiños);
router.get('/ninas', productController.viewProductsNiñas);
router.get('/sale', productController.viewSaleProducts);

//GET listado para administrador
router.get('/list', adminMiddleware, productController.viewProductList)

//procesamiento POST
router.get('/new', adminMiddleware, productController.viewCreateProduct);
router.post('/new', uploadFile.single('product-img'), validationsMiddleware.validacionesProducts, productController.createProduct);

//procesamiento PUT y DELETE
router.get('/edit/:id',adminMiddleware, productController.viewEditProduct);
router.put('/edit/:id',adminMiddleware, validationsMiddleware.validacionesEditProducts, productController.updateProduct); 
router.delete('/edit/:id',adminMiddleware, productController.deleteProduct);

router.get('/search', productController.searchProducts)

//GET
router.get('/:id', productController.viewProduct);

router.get('/api/products', productController.listProducts);
router.get('/api/products/:id', productController.apiProductForId);



module.exports = router;