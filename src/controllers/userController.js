const { validationResult } = require("express-validator");
const bcrypjs = require("bcryptjs");
let db = require("../database/models");
const { localsName } = require("ejs");

const viewLogin = (req, res) => {
  res.render("login");
};

const login = (req, res) => {
    let errors = validationResult(req);
    let loggedUser;
    if (errors.isEmpty()) 
    {
        db.User.findOne({
            where:{
                email: req.body.email
            }
        })
        .then(user => {
            if(user!=null || user!=undefined)
            {
                let userToLogin = user.dataValues;
                if (bcrypjs.compareSync(req.body.password, userToLogin.password)){
                    loggedUser = userToLogin;
                }
                
                if(loggedUser == null || loggedUser == undefined)
                {
                    return res.render('login', {errors: {
                        credenciales:{
                            msg: 'Credenciales inválidas'
                        }}, old: req.body});
                }
                delete loggedUser.password;
                req.session.loggedUser = loggedUser;

                if(req.body.rememberMe){
                    res.cookie('dataEmail', req.body.email, { maxAge: (1000 * 60) * 15})
                }

                res.redirect('/');
            }
            else {        
                return res.render('login', {errors: {
                    credenciales:{
                        msg: 'Credenciales inválidas'
                    }}, old: req.body});
            }
        })
    }
    else {        
      return res.render('login', {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
};

const logout = (req, res) => {
  res.clearCookie("dataEmail");
  req.session.destroy();
  return res.redirect("/");
};

const viewRegister = (req, res) => {
  res.render("register", {});
};

const createUser = (req, res) => {
  const resultValidation = validationResult(req);
  if (resultValidation.errors.length > 0) {
    return res.render("register", {
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  let userInDB;
  db.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((response) => (userInDB = response));

  if (userInDB != null || userInDB != undefined) {
    return res.render("register", {
      errors: {
        email: {
          msg: "Este email ya está registrado",
        },
      },
      oldData: req.body,
    });
  }

  let user = {
    ...req.body,
    password: bcrypjs.hashSync(req.body.password, 10),
    img: "/images/users/" + req.file.filename,
    id_type_user: 2,
  };

  db.User.create({
    name: user.name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    password: user.password,
    img: user.img,
    id_type_user: user.id_type_user,
  }).then(() => {
    return res.redirect("/user/login");
  });
};

const viewProfile = (req, res) => {
  res.render("userProfile", {});
};

const profilesList = (req, res) => {
  db.User.findAll()
    .then(function (user) {
        res.render("userList", { user: user });
  });
};

const userEdit = (req,res) => {
    db.User.findAll()
        .then (function (user) {
            if (res.locals.loggedUser.id_type_user == 1)  {
                res.render ("userList", {user})
            } else {
                res.render ("userProfile")
            }
    });
}

const userDelete = (req,res) => {
    res.render ("userList")
}

const viewForgotPassword = (req, res) => {
  res.render("forgotpassword", {});
};

const updateUser = (req, res) => {
  const resultValidation = validationResult(req);
  if (resultValidation.errors.length > 0) {
    return res.render("register", {
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  let user = {
    ...req.body,
    password: bcrypjs.hashSync(req.body.password, 10),
    img: "/images/users/" + req.file.filename,
    id_type_user: 2,
  };

  db.User.update(
    {
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      img: user.img,
      id_type_user: user.id_type_user,
    },
    { where: { id_user: req.params.id } }
  ).then(() => {
    //TODO: Crear la ruta user/edit/:id para redireccionar a una vista
  });
};

const loginController = {
  viewLogin,
  login,
  logout,
  viewRegister,
  createUser,
  viewProfile,
  viewForgotPassword,
  updateUser,
  profilesList,
  userDelete,
  userEdit,
};

module.exports = loginController;
