
const login = (req, res) => {
    res.render('login', {});
};

const register = (req, res) => {
    res.render('register', {});
};

const forgotpassword = (req, res) => {
    res.render('forgotpassword', {});
};

const add = (req, res) => {
    res.render ('productAdd', {});
}

const loginController = {
    login,
    forgotpassword,
    register,
    add,
};

// Acá exportamos el resultado
module.exports = loginController;