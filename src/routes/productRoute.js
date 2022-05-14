const express = require ('express');
const router = express.Router();

const productController = require ('../controllers/productController');

//router.get ('/', productController.product);
router.get ('/ninos', productController.productsNiños);
router.get ('/ninas', productController.productsNiñas);
router.get ('/new', productController.newProduct);
router.post ('/new', productController.postProduct);

router.get ('/:id/edit', productController.editProduct);
router.put ('/:id/edit', productController.putProduct);
router.delete ('/:id/edit', productController.deleteProduct);

router.get ('/:id', productController.getProduct);





module.exports = router;