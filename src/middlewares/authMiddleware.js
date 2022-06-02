function authMiddleware (req,res,next) {
    if (!req.session.loggedUser) {
        res.redirect ('/user/login');
    }
    next(); 
}

module.exports = authMiddleware;