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

const getProduct = (req, res) => {
    // let idProducto = req.params.id;
    // res.render('product', {producto: producto(idProducto), productos: productos});
    const product = req.params.id_product;
    const this_product = productos.find((el) => el.id === parseInt(product));
    res.render('product', {producto:this_product});
}

const newProduct = (req,res) => {
    res.render ('productAdd');
}

const postProduct = (req, res) => {
}; 

const editProduct = (req, res) => {
}; 

const putProduct = (req, res) => {
}; 

const deleteProduct = (res, req) => {
    let idProducto = req.body.id;
    let newListProducts = productos.filter((producto)=>{
        return producto.id!=idProducto;
    });
    productos=newListProducts;
    res.send(productos);
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