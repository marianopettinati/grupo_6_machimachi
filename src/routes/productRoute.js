const express = require ('express');
const router = express.Router();

const productController = require ('../controllers/productController');

//router.get ('/', productController.product);

router.get ('/new', productController.newProduct);
router.post ('/new', productController.postProduct);

router.get ('/:id/edit', productController.editProduct);
router.delete ('/:id/edit', productController.deleteProduct);

router.get ('/:id', productController.getProduct);

//router.get ('/:id/editar', productController.editarProduct)
//router.put ('/:id', productController.putNota)

module.exports = router;