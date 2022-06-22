function adminMiddleware (req,res,next) {
    if (!req.session.loggedUser || (locals.loggedUser.id_type_user !=1)) {
        res.redirect ('/');
    }
    next(); 
}

module.exports = adminMiddleware;