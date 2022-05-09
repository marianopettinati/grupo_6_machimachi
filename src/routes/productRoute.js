const express = require ('express');
const router = express.Router();

const productController = require ('../controllers/productController');

//router.get ('/', productController.product);

router.get ('/new', productController.newProduct);

router.get ('/:id', productController.getProduct);
router.delete ('/:id', productController.deleteProduct);



//router.post ('/new', productController.postProduct);
//router.get ('/:id/editar', productController.editarProduct)
//router.put ('/:id', productController.putNota)

module.exports = router;