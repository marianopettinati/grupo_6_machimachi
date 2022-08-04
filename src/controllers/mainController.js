let db = require('../database/models');
const Op = db.Sequelize.Op;

const home = (req, res) => {
    db.Product.findAll()
    .then(resultado => res.render('home', {productos : resultado}))
   
}

const nosotros = (req,res) => {
    res.render ('nosotros');
}

const mainController = {
    home,
    nosotros,
}


// Acá exportamos el resultado
module.exports = mainController;