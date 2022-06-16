const res = require('express/lib/response');
const fs = require('fs');
const path = require('path');
const product_path = path.join(__dirname,'../data/products.json');
const file_data = fs.readFileSync(product_path, 'utf-8');
const productos = JSON.parse (file_data);

const newProduct = (req,res) => {
    res.render ('productAdd');
}

const lastId = () => {
    let i=0;
    const lastId = productos.filter((el) => {
        i++;
        return el.id != i;
    });
    i++;
    return i;
}

const postProduct = (req, res) => {
    productos.push ({
        id : lastId(),
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        img : "/images/" + req.file.filename,
        gender : req.body.gender,
        
    });

    const productos_string = JSON.stringify (productos,null,2);
    fs.writeFileSync(product_path,productos_string);

    res.redirect ("/");
}; 

const getProduct = (req, res) => {
    const idProduct = req.params.id;
    const producto = productos.find((el) => el.id === parseInt(idProduct));
    res.render('product', {producto, productos});
};

const getProductList = (req,res) => {
    res.render('productList', {productos});  
    
}

//editProduct y putProduct funcionan en conjunto para mostrar el producto a editar y hacer el put dps de editarlo
const editProduct = (req, res) => {
    let id_producto = req.params.id;
    const producto = productos.find((el) => el.id === parseInt(id_producto));
    res.render('productEdit', {producto});  
}; 

const putProduct = (req, res) => {
    productos.forEach(element => {
        if(element.id === parseInt(req.params.id)){
            element.name = req.body.name;
            element.price = req.body.price;
            element.description = req.body.description;
            element.gender = req.body.gender;
        };
    });

    let data = JSON.stringify(productos,null,2);
    fs.writeFileSync(product_path,data);
    res.redirect("/")

}; 

const deleteProduct = (req, res) => {

    let id_producto = req.params.id;
    let filtered_products = productos.filter(el => el.id!== parseInt(id_producto));
    let inventario = JSON.stringify (filtered_products,null,2);
    fs.writeFileSync (product_path,inventario);
    res.redirect ('/');
    
}

const productsNiñas = (req,res)=> {
    let productosNiñas= productos.filter((el) => el.gender === "niñas");
    res.render('productsGender', { products: productosNiñas, category:"Niñas"})
}

const productsNiños = (req,res)=> {
    let productosNiños= productos.filter((el) => el.gender === "niños");
    res.render('productsGender', { products: productosNiños, category:"Niños"})
}

const saleProducts = (req,res)=> {
    let productoSale= productos.filter((el) => el.discount != 0);
    res.render('productsGender', { products: productoSale, category:"Sale"})
}



const productController = {
    getProduct,
    getProductList,
    newProduct,
    postProduct,
    editProduct,
    putProduct,
    deleteProduct,
    productsNiñas,
    productsNiños,
    saleProducts,
    

}

// Acá exportamos el resultado
module.exports = productController;