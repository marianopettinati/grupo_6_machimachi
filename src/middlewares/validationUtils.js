const { body } = require('express-validator');
const path = require ('path');

const validacionesRegister = [
    body('name')
                .notEmpty().withMessage('El campo nombre es requerido').bail()
                .isLength({min:3}).withMessage('Debe tener minimo 3 caracteres'),
    body('last_name')
                .notEmpty().withMessage('El campo apellido es requerido').bail()
                .isLength({min:2}).withMessage('Debe tener minimo 2 caracteres'),
    body('email')
                .notEmpty().withMessage('El campo email es requerido').bail()
                .isEmail().withMessage('Debe ser un formato de email valido'),
    body('phone')
                .notEmpty().withMessage('El campo telefono es requerido').bail()
                .isLength({min:8}).withMessage('Debe tener minimo 8 caracteres'),
    body('password')
                .notEmpty().withMessage('El campo contraseña es requerido').bail(),
    body('userImg').custom((value, { req }) => {
        let file = req.file;
        const extencionesAceptadas = ['.jpg', '.png', '.gif'];

        if(!file){
            throw new Error('Debe subir una imagen');
        }
        else
        {
            let extencion = path.extname(file.originalname);
            if(!extencionesAceptadas.includes(extencion))
            {
                throw new Error(`Debe ser una imagen con formato: ${extencionesAceptadas.join(', ')}`);
            }
        }
        return true;
    })
];

const validacionesLogin = [
    body('email').notEmpty().withMessage("Debes completar tu correo").bail()
        .isEmail().withMessage("Debes completar un email válido"),
    body('password').notEmpty().withMessage("Debes ingresar tu contraseña")
];

const validaciones = {
    validacionesRegister,
    validacionesLogin,
}

module.exports = validaciones;