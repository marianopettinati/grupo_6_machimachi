const express = require ('express');
const router = express.Router();

const loginController = require("../controllers/userController");
const productController = require ('../controllers/productController');

router.get('/products', productController.listProducts);
router.get('/products/:id', productController.apiProductForId);

router.get("/users", loginController.apiUsers);
router.get("/users/:id", loginController.apiUsersForId);

module.exports=router;