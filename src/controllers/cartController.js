let db = require('../database/models');
const Op = db.Sequelize.Op;


const viewCart = (req, res) => {
    let Cart;
    db.Cart.findOne({
        include: ["products"],
        where: {
            id_user: req.session.loggedUser.id_user,
            id_status: 2
        }
    })
    .then((cart) => {
        if(cart!= null && cart!=undefined){
            console.log(cart.dataValues);
            Cart= cart.dataValues;
            let Products = cart.dataValues.products;
            let productos = [];
            if(Products.length>0){
                for(let product of Products){
                    console.log("data values del detail carts", product.details_cart.dataValues)
                    productos.push(product.dataValues);
                }
            }
            console.log(productos);
            res.render('productCart', {productos: productos, cart: Cart});
        }
        else{
            //SE DEBERÍA CREAR UN CARRITO SIEMPRE QUE SE CREA UN USUARIO O CUANDO SE COMPLETA/COMPRA UN CARRITO DE UN USUARIO
            //SI SE HACE ESTO, CARRITO NUNCA SERÍA NULL, DEBERÍA CAMBIAR LA CONDICION DEL IF POR UNA QUE SI PRODUCTS!=0
            res.render('productCart', {productos: [], cart: null})
        }
    })
};

//TODO: hacer una vista de no hay productos 

const cartController = {
    viewCart,
};

// Acá exportamos el resultado
module.exports = cartController;