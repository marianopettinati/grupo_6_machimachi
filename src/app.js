const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require ('method-override');


const rutasMain = require ('./routes/mainRoute');
const rutasCarrito = require('./routes/cartRoute');
const rutasProduct = require('./routes/productRoute');
const rutasLogin = require('./routes/loginRoute');

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

//Habilitar peticiones put y delete
app.use (methodOverride('_method'));

//habilitar recepción de información
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Configuración EJS
app.set ("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"));

//Rutas
app.use('/', rutasMain);
app.use('/cart', rutasCarrito);
app.use('/product', rutasProduct);
app.use('/user', rutasLogin);


app.listen (3000, ()=>{
    console.log("Servidor corriendo en el puerto 3000");
});
