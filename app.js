const express = require('express');
const app = express();
const path = require('path');

const rutasMain = require ('./routes/main');
const rutasCarrito = require('./routes/cart');
const rutasProduct = require('./routes/product');
const rutasLogin = require('./routes/login');

const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

app.listen(3000, ()=>{
    console.log("Servidor corriendo ok");
});

app.set ("view engine", "ejs")

app.use('/', rutasMain);

app.use('/cart', rutasCarrito);

app.use('/product', rutasProduct);

app.use('/user', rutasLogin);