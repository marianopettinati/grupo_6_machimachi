const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const validaciones = require("../middlewares/validationUtils");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/users"));
  },
  filename: function (req, file, cb) {
    const nombreDeImg =
      file.fieldname + Date.now() + path.extname(file.originalname);
    cb(null, nombreDeImg);
  },
});

const uploadFile = multer({ storage });

const loginController = require("../controllers/userController");

router.get("/login", guestMiddleware, loginController.viewLogin);

router.post("/login", validaciones.validacionesLogin, loginController.login);

router.get("/register", guestMiddleware, loginController.viewRegister);

router.post(
  "/register",
  uploadFile.single("userImg"),
  validaciones.validacionesRegister,
  loginController.createUser
);

router.get("/forgotpassword", loginController.viewForgotPassword);

router.get("/profile", authMiddleware, loginController.viewProfile);

router.post("/logout", loginController.logout);

//enrutadores del list
router.get("/list", adminMiddleware, loginController.profilesList); //FALTA EL ADMINMIDDLEWARE, no lo puse para testear más fácil
router.put ("/list", loginController.userEdit);
router.delete ("/list", loginController.userDelete);

router.get("/api/users", loginController.apiUsers);
router.get("/api/users/:id", loginController.apiUsersForId);


module.exports = router;
