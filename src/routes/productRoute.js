const express = require ('express');
//const { product } = require('../controllers/productController');
const router = express.Router();

const productController = require ('../controllers/productController');

//router.get ('/', productController.product);

router.get ('/:id', productController.getProduct);
//router.get ('/:id/editar', productController.editarProduct)
//router.put ('/:id', productController.putNota)
router.delete ('/:id', productController.deleteProduct);
router.get ('/new', productController.newProduct);
//router.post ('/new', productController.postProduct);


module.exports = router;