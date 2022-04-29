const express = require ('express');
const router = express.Router();

const productController = require ('../controllers/productController');

router.get ('/', productController.product);
router.get ('/:id', productController.viewProduct);

module.exports = router;