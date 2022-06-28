const express = require ('express');
const router = express.Router();
const authMiddleware = require ('../middlewares/authMiddleware');

const cartController = require ('../controllers/cartController');

router.get('/', authMiddleware, cartController.viewCart);

module.exports=router;