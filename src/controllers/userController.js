const { validationResult } = require("express-validator");
const bcrypjs = require("bcryptjs");
let db = require("../database/models");
const { localsName } = require("ejs");
const { BLOB } = require("sequelize");

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
        .catch(error => console.log(error))
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
  }).then((response) => (userInDB = response))
  .catch(error => console.log(error));

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
  })
  .catch(error => console.log(error));
};

const viewProfile = (req, res) => {
  res.render("userProfile", {});
};

const profilesList = (req, res) => {
  db.User.findAll()
    .then(function (user) {
        res.render("userList", { user: user });
  })
  .catch(error => console.log(error));
};

const userEdit = (req,res) => {
    db.User.findAll()
        .then (function (user) {
            if (res.locals.loggedUser.id_type_user == 1)  {
                res.render ("userList", {user})
            } else {
                res.render ("userProfile")
            }
          })
          .catch(error => console.log(error));
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
  })
  .catch(error => console.log(error));
};

const apiUsers = (req, res) => {
  db.User.findAll()
  .then(users => {
    let usersList = [];
    users.forEach(user => {
      let userAdd = {
        id: user.id_user,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        detail: "http://localhost:3000/user/api/users/"+user.id_user
      }
      usersList.push(userAdd);
    });
    return res.status(200).json({
      count: usersList.length,
      data: usersList,
      status: 200
    })
  })
  .catch((err) => {
    if(err.parent.code=='ER_ACCESS_DENIED_ERROR')
    {
      return res.status(500).json({
        error: "Error en la conexión con la base de datos",
        status: 500
      })
    }
   })
}

const apiUsersForId = (req, res) => {
  db.User.findByPk(req.params.id)
  .then(userInDb => {
    let user = {
      id: userInDb.id_user,
      name: userInDb.name,
      last_name: userInDb.last_name,
      email: userInDb.email,
      img: userInDb.img,
      phone: userInDb.phone
    }
    return res.status(200).json({
      data: user,
      status: 200
    })
  })
  .catch(err => {
  
    if(err.parent && err.parent.code=='ER_ACCESS_DENIED_ERROR')
    {
      return res.status(500).json({
        error: "Error en la conexión con la base de datos",
        status: 500
      })
    }
    
    if(err.parent == undefined)
    {
      res.status(404).json({
        error: "Usuario no encontrado. Pruebe con otro id"
      })
    }
    
  })
}

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
  apiUsers,
  apiUsersForId
};

module.exports = loginController;
