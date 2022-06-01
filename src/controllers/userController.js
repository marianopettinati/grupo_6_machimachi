const { validationResult } = require('express-validator');
const bcrypjs = require('bcryptjs');
const User = require('../models/User');

const login = (req, res) => {
    res.render('login', {});
};

const register = (req, res) => {
    res.render('register', {});
};

const forgotpassword = (req, res) => {
    res.render('forgotpassword', {});
};

const add = (req, res) => {
    res.render ('productAdd', {});
}

const processRegister = (req, res) => {
    const resultValidation = validationResult(req);
    if(resultValidation.errors.length > 0){
        return res.render('register', {
            errors: resultValidation.mapped(),
            oldData: req.body
        });
    }

    let userInDB = User.findByField('email', req.body.email);

    if(userInDB){
        return res.render('register', {
            errors: {
                email:{
                    msg: 'Este email ya está registrado'
                }
            },
            oldData: req.body
        });
    }

    let user = {
        ...req.body,
        password: bcrypjs.hashSync(req.body.password, 10),
        img: req.file.filename,
    }

    User.create(user);

    return res.redirect('/user/login')
}

const loginController = {
    login,
    forgotpassword,
    register,
    add,
    processRegister
};

// Acá exportamos el resultado
module.exports = loginController;