const User = require('../models/User');

function loggedMiddleware (req, res, next) {
    res.locals.isLogged = false;
    
    let cookieEmail = req.cookies.dataEmail; 
     let cookieUser = User.findByField('email', cookieEmail);


     if(cookieUser){
        req.session.loggedUser = cookieUser;
     }


    if (req.session.loggedUser) {
        res.locals.isLogged = true
        res.locals.loggedUser = req.session.loggedUser;
    }
    
    next ();
}

module.exports = loggedMiddleware;
