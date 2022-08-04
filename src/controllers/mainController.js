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

const mainController = {
    home,
    nosotros,
    ayuda,
    contacto,
}


// Acá exportamos el resultado
module.exports = mainController;