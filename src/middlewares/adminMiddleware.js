function adminMiddleware (req,res,next) {
    if (!req.session.loggedUser || !locals.loggedUser.admin) {
        res.redirect ('/');
    }
    next(); 
}

module.exports = adminMiddleware;