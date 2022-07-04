function adminMiddleware (req,res,next) {
    if (!req.session.loggedUser || (res.locals.loggedUser.id_type_user !=1)) {
        res.redirect ('/');
    }
    next(); 
}

module.exports = adminMiddleware;