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
}

const editProduct = (req, res) => {
    const idProduct = req.params.id;
    const producto = productos.find((el) => el.id === parseInt(idProduct));
    res.render('productEdit', {producto});  
}; 

const putProduct = (req, res) => {
}; 

const deleteProduct = (res, req) => {
    let idProducto = req.body.id;
    let newListProducts = productos.filter((producto)=>{
        return producto.id!=idProducto;
    });
    const prod_restantes = JSON.stringify (newListProducts,null,2);
    fs.writeFileSync (product_path,prod_restantes);
    res.redirect ('/');
    // productos=newListProducts;
    // res.send(productos);
}

const productController = {
    getProduct,
    newProduct,
    postProduct,
    editProduct,
    putProduct,
    deleteProduct,

}

// Acá exportamos el resultado
module.exports = productController;