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
        .catch(error => console.log(error))
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
        .catch(error => console.log(error))
};

const viewProductList = (req,res) => {
    let product = db.Product.findByPk(req.params.id);
    let products = db.Product.findAll();

    Promise.all([product, products])
        .then(([producto, productos]) => {
            res.render('productList', {producto, productos});
        })
        .catch(error => console.log(error))
}

const viewEditProduct = (req, res) => {
    db.Product.findByPk(req.params.id)
        .then((product) => {
            let producto = product.dataValues;
            res.render('productEdit', {producto});  
        })
        .catch(error => console.log(error))
}; 

const updateProduct = (req, res) => { 
    let errors = validationResult(req);
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
        .catch(error => console.log(error))
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
    .catch(error => console.log(error))   
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
    .catch(error => console.log(error))  
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
    .catch(error => console.log(error))
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
        .catch(error => console.log(error))
}

const searchProducts = (req, res) => {
    db.Product.findAll({
        where:{
            name: {[Op.like]: `%${req.query.search}%`}
        }
    })
    .then(resultados => {
        resultados.length > 0 ? res.render('productsGender', 
        { products: resultados, category:`Resultado de la búsqueda de ${req.query.search}`}) 
        : res.render('productsGender', 
        { products: resultados, category:`No hubo coincidencias con su búsqueda ${req.query.search}`})
    })
    .catch(error => console.log(error))
}

const listProducts = (req, res) => {
    db.Product.findAll({
        include: ["product_details"]})
        .then(products => {
            let productsNiños = products.filter(product => product.gender === 'niños');
            let productsNiñas = products.filter(product => product.gender === 'niñas');
            let productsSale= products.filter((el) => el.discount != 0);
            let productsGenres = [{niños: productsNiños.length}, 
                {niñas: productsNiñas.length}];
            let productList = [];
            products.forEach(product => {
                let details = [];
                product.product_details.forEach(detalle => {
                    let stock = detalle.stock;
                    let size = detalle.size;
                    details.push({stock: stock, size: size})
                });
                let prod = {
                    id: product.id_product,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    gender: product.gender,
                    discount: product.discount,
                    detail: "http://localhost:3000/product/api/products/"+product.id_product,
                    details_products: details
                };
                productList.push(prod);
            })
            return res.status(200).json({
            count: products.length,  
            countByGenres: productsGenres,
            countBySale: productsSale.length,
            products: productList,      
            status: 200
            })
        })
        .catch(err => {
            if(err.parent && err.parent.code=='ER_ACCESS_DENIED_ERROR')
                {
                return res.status(500).json({
                    error: "Error en la conexión con la base de datos",
                    status: 500
                })
                }
        })
}

const apiProductForId = (req, res) => {
    db.Product.findByPk(req.params.id, {
        include: ["product_details"]})
    .then(productInDb => {
        let details = [];
        productInDb.product_details.forEach(detalle => {
            let stock = detalle.stock;
            let size = detalle.size;
            details.push({stock: stock, size: size})
        });
        let product = {
        id: productInDb.id_product,
        name: productInDb.name,
        price: productInDb.price,
        description: productInDb.description,
        img: productInDb.img,
        gender: productInDb.gender,
        discount: productInDb.discount,
        details: details
        }
        return res.status(200).json({
        data: product,
        status: 200
        })
    })
    .catch(err => {
  
        if(err.parent && err.parent.code=='ER_ACCESS_DENIED_ERROR')
        {
          return res.status(500).json({
            error: "Error en la conexión con la base de datos",
            status: 500
          })
        }
        
        if(err.parent == undefined)
        {
          res.status(404).json({
            error: "Producto no encontrado. Pruebe con otro id"
          })
        }
        
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
    searchProducts,
    listProducts,
    apiProductForId
}

module.exports = productController;