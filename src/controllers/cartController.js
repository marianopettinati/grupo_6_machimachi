let db = require('../database/models');
const Op = db.Sequelize.Op;


const viewCart = (req, res) => {
    let Cart;
    db.Cart.findOne({
        include: ["products"],
        where: {
            id_user: req.session.loggedUser.id_user,
            status: "Incompleta"
        }
    })
    .then((cart) => {
        if(cart!= null && cart!=undefined){            
            Cart= cart.dataValues;
            let Products = cart.dataValues.products;
            let productos = [];
            if(Products.length>0){
                for(let product of Products){
                    productos.push(product.dataValues);
                }
            }
            res.render('productCart', {productos: productos, cart: Cart});
        }
        else{
            res.render('productCart', {productos: [], cart: null})
        }
    })
    .catch(error => console.log(error))
};

const addProduct = (req, res) => {
    let Cart;
    db.Cart.findOne({
        include: ["products"],
        where: {
            id_user: req.session.loggedUser.id_user,
            status: "Incompleta"
        }
    })
    .then((cart) => {
        if(cart!= null && cart!=undefined){            
            Cart= cart.dataValues;
        }
    })
    .catch(error => console.log(error))

    let Product ;
    db.Product.findByPk(req.params.id, {
        include: ["product_details"]})
    .then(productInDb => Product = productInDb)
    .catch(error => console.log(error))
    
    let productsList = [];
    
    if((Cart!= null && Cart!=undefined)&&(Product!= null && Product!=undefined)){
        db.ProductDetail.create({
            id_cart: Cart.id_cart,
            id_product: Product.id_product
        })
        .then(() => {
            console.log('Detalle creado ok');
        })
        .catch(error => console.error(error))

        productsList=Cart.products;
        productsList.push(Product)

        db.Cart.update({
            sub_total: Cart.sub_total+Product.price,
            total: Cart.total+Product.price,
            products: productsList
        },{
            where:{
                id_cart: Cart.id_cart
        }})
        .then(() => {
            res.redirect ("/cart");
        })
        .catch(error => console.log(error))

    }
    if((Cart== null || Cart==undefined)&&(Product!= null && Product!=undefined)){
        
        productsList.push(Product);
        db.Cart.create({
            coupon: null,
            sub_total: Product.price,
            total: Product.price,
            status: 'Incompleta',
            products: productsList
        }).then(() => console.log("Carrito creado ok"))
        .catch(error=>console.log(error))

        db.Cart.findOne({
            include: ["products"],
            where: {
                id_user: req.session.loggedUser.id_user,
                status: "Incompleta"
            }
        })
        .then((cart) => {
            if(cart!= null && cart!=undefined){            
                Cart= cart.dataValues;
            }
        })
        .catch(error => console.log(error))

        db.ProductDetail.create({
            id_cart: Cart.id_cart,
            id_product: Product.id_product
        })
        .then(() => {
            res.redirect ("/cart")
        })
        .catch(error => console.error(error))
    }
}


const cartController = {
    viewCart,
    addProduct
};

module.exports = cartController;