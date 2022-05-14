const res = require('express/lib/response');
const fs = require('fs');
const path = require('path');
const product_path = path.join(__dirname,'../data/products.json');
const file_data = fs.readFileSync(product_path, 'utf-8');
const productos = JSON.parse (file_data);

// const producto = (id) => {
//     let producto;
//     productos.forEach((item) => {
//         if(item.id==id){
//             producto=item;
//         }
//     });
//     return producto;
// }

// const product = (req, res) => {
//     res.render('product', {productos: productos});
// };


const newProduct = (req,res) => {
    res.render ('productAdd');
}

const postProduct = (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const img = req.body.img;
    const gender = req.body.gender
    const dateOfCreation = Date.now();

    productos.push ({
        name,
        description,
        price,
        img,
        gender,
        id : parseInt(dateOfCreation)
    });

    const productos_string = JSON.stringify (productos,null,2);
    fs.writeFileSync(product_path,productos_string);

    res.redirect ("/");
}; 

const getProduct = (req, res) => {
    const idProduct = req.params.id;
    const producto = productos.find((el) => el.id === parseInt(idProduct));
    res.render('product', {producto, productos: productos});
};

//editProduct y putProduct funcionan en conjunto para mostrar el producto a editar y hacer el put dps de editarlo
const editProduct = (req, res) => {
    const id_producto = req.params.id;
    const producto = productos.find((el) => el.id === parseInt(id_producto));
    res.render('productEdit', {producto});  
}; 

const putProduct = (req, res) => {
    const id_producto = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const description =req.body.description
    const gender = req.body.gender
    //me falta la imagen

    productos.forEach(element => {
        if(element.id === parseInt(id_producto)){
            element.name = name;
            element.price = price;
            element.description = description;
            element.gender = gender;
        };
    });

    let data = JSON.stringify(productos,null,2);
    fs.writeFileSync(product_path,data);
    res.redirect("/")

}; 

const deleteProduct = (res, req) => {
    let id_producto = req.params.id;
    let filtered_products = productos.filter(el => el.id!== parseInt(id_producto));
    let inventario = JSON.stringify (filtered_products,null,2);
    fs.writeFileSync (product_path,inventario);
    res.redirect ('/register');
    
}

const productsNiñas = (req,res)=> {
    let productosNiñas= productos.filter((el) => el.gender === "Niñas");
    res.render('productsGender', { products: productosNiñas})
    
}

const productsNiños = (req,res)=> {
    let productosNiños= productos.filter((el) => el.gender === "Niños");
    res.render('productsGender', { products: productosNiños})
}


const productController = {
    getProduct,
    newProduct,
    postProduct,
    editProduct,
    putProduct,
    deleteProduct,
    productsNiñas,
    productsNiños,

}

// Acá exportamos el resultado
module.exports = productController;