function loggedMiddleware (req, res, next) {
    res.locals.isLogged = false;
    
    if (req.session.loggedUser) {
        res.locals.isLogged = true
        res.locals.loggedUser = req.session.loggedUser;
    }
    
    next ();
}

module.exports = loggedMiddleware;
