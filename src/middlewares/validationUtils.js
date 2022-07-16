const { body } = require('express-validator');
const path = require ('path');

const validacionesRegister = [
    body('name')
                .notEmpty().withMessage('El campo nombre es requerido').bail()
                .isLength({min:2}).withMessage('Debe tener minimo 2 caracteres'),
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
                .notEmpty().withMessage('El campo contraseña es requerido').bail()
                .isLength({min:8}).withMessage('Debe tener minimo 8 caracteres'),
    body('userImg').custom((value, { req }) => {
        let file = req.file;
        const extencionesAceptadas = ['.jpg', '.jpeg', '.png', '.gif'];

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

const validacionesProducts = [
    body('name')
            .notEmpty().withMessage('El campo nombre es requerido').bail()
            .isLength({min:5}).withMessage('Debe tener minimo 5 caracteres'),
    body('price')
            .notEmpty().withMessage('El campo precio es requerido').bail(),
    body('description')
            .notEmpty().withMessage('El campo descripcion es requerido').bail()
            .isLength({min:20}).withMessage('Debe tener minimo 20 caracteres'),
    body('product-img').custom((value, { req }) => {
            let file = req.file;
            const extencionesAceptadas = ['.jpg', '.jpeg', '.png', '.gif'];

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

const validacionesEditProducts = [
    body('name')
            .notEmpty().withMessage('El campo nombre es requerido').bail()
            .isLength({min:5}).withMessage('Debe tener minimo 5 caracteres'),
    body('price')
            .notEmpty().withMessage('El campo precio es requerido').bail(),
    body('description')
            .notEmpty().withMessage('El campo descripcion es requerido').bail()
            .isLength({min:20}).withMessage('Debe tener minimo 20 caracteres')
];

const validaciones = {
    validacionesRegister,
    validacionesLogin,
    validacionesProducts,
    validacionesEditProducts,
}

module.exports = validaciones;