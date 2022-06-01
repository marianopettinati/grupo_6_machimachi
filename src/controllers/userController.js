const bcrypt = require ('bcrypt');
const fs = require ('fs');
const { validationResult } = require ('express-validator');



const getLogin = (req,res) => {
    res.render ('login');
};

const postLogin = (req, res) => {
    let errors = validationResult(req);
    let loggedUser;
    if (errors.isEmpty()) {
        let usersJSON = fs.readFileSync ('users.json', { encoding: 'utf-8' } );
        let users;
        if (usersJSON == "") {
            users = []
        } else {
            users = JSON.parse(usersJSON);
        }

        users.forEach(user  => {
           if (user.email == req.body.email) {
                if (req.body.password == user.password) { //(bcrypt.compareSync(req.body.password,user.password)){
                    loggedUser = user;
                    //break;
                };
            }
        });
        
        if (loggedUser == undefined) {
            return res.render('login', {errors: [{msg : 'Credenciales inválidas'}] });
        }

        delete loggedUser.password;
        req.session.loggedUser = loggedUser;
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
    req.session.destroy();
    return res.redirect ('/');
}

const profile = (req,res) => {
    res.render ('userProfile', {user : req.session.loggedUser});
}

// const add = (req, res) => {
//     res.render ('newUser', {});
// }

const loginController = {
    getLogin,
    postLogin,
    forgotpassword,
    register,
    logout,
    profile,
    // add,
};

// Acá exportamos el resultado
module.exports = loginController;