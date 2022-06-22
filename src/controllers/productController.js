let db = require('../database/models');
const Op = db.Sequelize.Op;

const viewCreateProduct = (req,res) => {
    res.render ('productAdd');
}

const createProduct = (req, res) => {
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

const viewProductsNiñas = (req,res)=> {
    let productsNiñas = [];
    db.Product.findAll({
        where:{
            gender: "niñas"
        }
    })
    .then(allProduct => {
        allProduct.forEach((product) => {
            productsNiñas.push(product.dataValues);
        });
    })
    .then(() =>{
        res.render('productsGender', { products: productsNiñas, category:"Niñas"})
    })   
}

const viewProductsNiños = (req,res)=> {
    let productsNiños = [];
    db.Product.findAll({
        where:{
            gender: "niños"
        }
    })
    .then(allProduct => {
        allProduct.forEach((product) => {
            productsNiños.push(product.dataValues);
        });
    })
    .then(() =>{
        res.render('productsGender', { products: productsNiños, category:"Niños"})
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
            name: {[Op.like]: `${req.query.search}%`}
        }
    })
    .then(resultados => {
        resultados.length > 0 ? res.render('productsGender', 
        { products: resultados, category:`Resultado de la búsqueda de ${req.query.search}`}) 
        : res.render('productsGender', 
        { products: resultados, category:`No hubo coincidencias con su búsqueda ${req.query.search}`})
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
    viewProductsNiñas,
    viewProductsNiños,
    viewSaleProducts,
    searchProducts
}

// Acá exportamos el resultado
module.exports = productController;