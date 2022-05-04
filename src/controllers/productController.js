const fs = require('fs');
const path = require('path');
const product_path = path.join(__dirname,'../data/products.json');
const file_data = fs.readFileSync(product_path, 'utf-8');
const productos = JSON.parse (file_data);

const producto = (id) => {
    let producto;
    productos.forEach((item) => {
        if(item.id==id){
            producto=item;
        }
    });
    return producto;
}

const product = (req, res) => {
    res.render('product', {productos: productos});
};

const viewProduct = (req, res) => {
    let idProducto = req.params.id;
    res.render('product', {producto: producto(idProducto), productos: productos});
}

const newProduct = (req,res) => {
    res.render ('productAdd', {});
}

const productController = {
    product,
    viewProduct,
    
}

// Acá exportamos el resultado
module.exports = productController;