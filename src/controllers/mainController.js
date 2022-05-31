const fs = require('fs');
const path = require('path');
const product_path = path.join(__dirname,'../data/products.json');
const file_data = fs.readFileSync(product_path, 'utf-8');
const productos = JSON.parse (file_data);

// Acá nos falta un objeto literal con las acciones para cada ruta


const home = (req, res) => {
   res.render('home', {productos : productos, usuario : req.session.usuarioLogueado})
}

const mainController = {
    home,
}

// Acá exportamos el resultado
module.exports = mainController;