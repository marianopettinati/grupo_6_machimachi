let db = require('../database/models');
const Op = db.Sequelize.Op;

const home = (req, res) => {
    db.Product.findAll()
    .then(resultado => res.render('home', {productos : resultado}))
    .catch(error => console.log(error))
}

const mainController = {
    home,
}

// Acá exportamos el resultado
module.exports = mainController;