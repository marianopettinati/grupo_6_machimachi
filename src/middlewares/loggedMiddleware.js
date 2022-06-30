let db = require('../database/models');

function loggedMiddleware (req, res, next) {
    res.locals.isLogged = false;    
    if(req.cookies && req.cookies.dataEmail){
        let emailInCookie = req.cookies.dataEmail;
        db.User.findOne({
            where:{
                email : emailInCookie
            }
        }).then(userFromCookie => {            
            if(userFromCookie){
                req.session.loggedUser = userFromCookie.dataValues;
            }
        })
    }
    if (req.session.loggedUser) {
        res.locals.isLogged = true 
        res.locals.loggedUser = req.session.loggedUser;        
    }
   
    next ();
}

module.exports = loggedMiddleware;
