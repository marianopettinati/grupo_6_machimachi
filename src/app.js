const express = require('express');
const app = express();
const path = require('path');

const rutasMain = require ('./routes/mainRoute');
const rutasCarrito = require('./routes/cartRoute');
const rutasProduct = require('./routes/productRoute');
const rutasLogin = require('./routes/userRoute');
const { urlencoded } = require('express');

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

//Habilitar peticiones put y delete
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


//Capturo en forma de objeto literal lo que llega de un form y habilito la posibilidad de pasarlo a un json
app.use (express.urlencoded ({extended:false}));
app.use (express.json());


//habilitar recepción de información
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Configuración EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'./views'));

//Rutas
app.use('/', rutasMain);
app.use('/cart', rutasCarrito);
app.use('/product', rutasProduct);
app.use('/user', rutasLogin);


app.listen (3000, ()=>{
    console.log("Servidor corriendo en el puerto 3000");
});
