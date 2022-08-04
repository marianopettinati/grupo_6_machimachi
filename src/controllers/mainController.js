let db = require('../database/models');
const Op = db.Sequelize.Op;

const home = (req, res) => {
    db.Product.findAll()
    .then(resultado => res.render('home', {productos : resultado}))
   
}

const nosotros = (req,res) => {
    res.render ('nosotros');
}

const ayuda = (req,res) => {
    res.render ('ayuda');
}

const contacto = (req,res) => {
    res.render ('contacto');
}

const seguinos = (req,res) => {
    res.render ('seguinos');
}

const mainController = {
    home,
    nosotros,
    ayuda,
    contacto,
    seguinos,
}


// Acá exportamos el resultado
module.exports = mainController;