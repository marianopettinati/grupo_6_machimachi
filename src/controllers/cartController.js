const fs = require('fs');
const path = require('path');
//const cart_path = path.join(__dirname,'../data/Cart.json');
//const cart_file_data = fs.readFileSync(cart_path, 'utf-8');
//const cart = JSON.parse (cart_file_data);
const cart_detail_path = path.join(__dirname,'../data/CartDetail.json');
const cart_detail_file_data = fs.readFileSync(cart_detail_path, 'utf-8');
const cart_detail = JSON.parse (cart_detail_file_data);

let detailProductsForId = (id) => {
    let cart = cart_detail.filter((carrito)=>{
        return carrito.idCart==id;
    })
    return cart;
}

const viewCart = (req, res) => {
    //TODO: Hacer un metodo para saber el nro de carrito por cliente y ahí traerme todos productos del carro
    let products = detailProductsForId(1);
    if(products.length!=0){
        res.render('productCart', {productos: products});
    }
    //TODO: hacer una vista de no hay productos 
};


const cartController = {
    viewCart,
};

// Acá exportamos el resultado
module.exports = cartController;