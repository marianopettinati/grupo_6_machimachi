const { validationResult } = require('express-validator');
const bcrypjs = require('bcryptjs');
const User = require('../models/User');

const getLogin = (req,res) => {
    res.render ('login');
};

const postLogin = (req, res) => {
    let errors = validationResult(req);
    let loggedUser;
    if (errors.isEmpty()) {
        let users = User.findAll();

        users.forEach(user  => {
           if (user.email == req.body.email) {
                if (bcrypjs.compareSync(req.body.password,user.password)){
                    loggedUser = user;
                }
            }
        });
        
        if (loggedUser == undefined) {
            return res.render('login', {errors: [{msg : 'Credenciales inválidas'}] });
        }

        delete loggedUser.password;
        req.session.loggedUser = loggedUser;

        if(req.body.rememberMe){
            res.cookie('dataEmail', req.body.email, { maxAge: 6000})
        }

        res.redirect('/');

    } else {        
        return res.render('login', {errors : errors.array(), old: req.body});
    }
};

const register = (req, res) => {
    res.render('register', {});
};

const forgotpassword = (req, res) => {
    res.render('forgotpassword', {});
};

const logout = (req,res) => {
    res.clearCookie('dataEmail');
    req.session.destroy();
    return res.redirect ('/');
}

const profile = (req,res) => {
   console.log(req.cookies.dataEmail);
    res.render ('userProfile', {});
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
        admin: false, 
        img: '/images/users/'+req.file.filename,
    }

    User.create(user);

    return res.redirect('/user/login')
}

const loginController = {
    getLogin,
    postLogin,
    forgotpassword,
    register,
    logout,
    profile,
    //add,
    processRegister
};

// Acá exportamos el resultado
module.exports = loginController;