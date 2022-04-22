
const login = (req, res) => {
    res.render('login', {});
};

const register = (req, res) => {
    res.render('register', {});
};

const forgotpassword = (req, res) => {
    res.render('forgotpassword', {});
};

const loginController = {
    login,
    forgotpassword,
    register,
};

// Acá exportamos el resultado
module.exports = loginController;