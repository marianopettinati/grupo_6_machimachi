const express = require ('express');
const router = express.Router();
const loggedMiddleware = require ('../middlewares/loggedMiddleware');


const mainController = require ('../controllers/mainController');

router.get('/', loggedMiddleware, mainController.home);

module.exports = router;