let db = require('../database/models');
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");

const viewCreateProduct = (req,res) => {
    res.render ('productAdd');
}

const createProduct = (req, res) => {
    let errors = validationResult(req);
    if(errors.isEmpty())
    {
        db.Product.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            img: "/images/" + req.file.filename,
            gender: req.body.gender,
            discount: (req.body.discount != null && req.body.discount != undefined ? req.body.discount : 0)
        }).then(() => {
            res.redirect ("/");
        })
    }
    else{
        return res.render("productAdd", {
            errors: errors.mapped(),
            oldData: req.body,
          });
    }
}; 

const viewProduct = (req, res) => {
    let product = db.Product.findByPk(req.params.id);
    let products = db.Product.findAll();

    Promise.all([product, products])
        .then(([producto, productos]) => {
            res.render('product', {producto, productos});
        })
};

const viewProductList = (req,res) => {
    let product = db.Product.findByPk(req.params.id);
    let products = db.Product.findAll();

    Promise.all([product, products])
        .then(([producto, productos]) => {
            res.render('productList', {producto, productos});
        })
}

const viewEditProduct = (req, res) => {
    db.Product.findByPk(req.params.id)
        .then((product) => {
            let producto = product.dataValues;
            res.render('productEdit', {producto});  
        })
}; 

const updateProduct = (req, res) => { 
    let errors = validationResult(req);
    console.log(errors);
    if(errors.isEmpty())
    {   
        db.Product.update({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            gender: req.body.gender,
            discount: (req.body.discount != null && req.body.discount != undefined ? req.body.discount : 0)
        }, 
        {
            where:{
                id_product: req.params.id
        }}).then(() => {
            res.redirect("/product/edit/"+req.params.id)
        })
    }
    else{
        return res.render("/product/edit/"+req.params.id, {
            errors: errors.mapped(),
            oldData: req.body,
        });
    }
}; 

const deleteProduct = (req, res) => {
    db.Product.destroy({
        where: {
            id_product: req.params.id
        }
    })
    .then(() => {
        res.redirect ('/');
    })    
}

const viewProductsNi??as = (req,res)=> {
    let productsNi??as = [];
    db.Product.findAll({
        where:{
            gender: "ni??as"
        }
    })
    .then(allProduct => {
        allProduct.forEach((product) => {
            productsNi??as.push(product.dataValues);
        });
    })
    .then(() =>{
        res.render('productsGender', { products: productsNi??as, category:"Ni??as"})
    })   
}

const viewProductsNi??os = (req,res)=> {
    let productsNi??os = [];
    db.Product.findAll({
        where:{
            gender: "ni??os"
        }
    })
    .then(allProduct => {
        allProduct.forEach((product) => {
            productsNi??os.push(product.dataValues);
        });
    })
    .then(() =>{
        res.render('productsGender', { products: productsNi??os, category:"Ni??os"})
    })
}

const viewSaleProducts = (req,res)=> {
    let productSale = [];
    db.Product.findAll({
        where: {
            discount: {[Op.gt]: 0}
        }
    })
        .then(allProduct => {
            allProduct.forEach((product) => {
                productSale.push(product.dataValues);
            });
        })
        .then(() =>{
            res.render('productsGender', { products: productSale, category:"Sale"})
        })
}

const searchProducts = (req, res) => {
    db.Product.findAll({
        where:{
            name: {[Op.like]: `%${req.query.search}%`}
        }
    })
    .then(resultados => {
        resultados.length > 0 ? res.render('productsGender', 
        { products: resultados, category:`Resultado de la b??squeda de ${req.query.search}`}) 
        : res.render('productsGender', 
        { products: resultados, category:`No hubo coincidencias con su b??squeda ${req.query.search}`})
    })
}



const productController = {
    viewProduct,
    viewProductList,
    viewCreateProduct,
    createProduct,
    viewEditProduct,
    updateProduct,
    deleteProduct,
    viewProductsNi??as,
    viewProductsNi??os,
    viewSaleProducts,
    searchProducts
}

module.exports = productController;