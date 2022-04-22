const express = require('express');
const routeMain = require ('./routes/mainRoutes')
const loginRoutes = require ('./routes/loginRoutes')
const cartRoutes = require ('./routes/cartRoutes')
const app = express();
const path = require('path');

const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

app.listen(3000, ()=>{
    console.log("Servidor corriendo ok");
});

app.set ("view engine", "ejs")

app.use('/', routeMain);

app.use('/cart', cartRoutes);

app.use('/register', loginRoutes);

app.use('/login', loginRoutes);

app.use('/forgotpassword', loginRoutes);

app.get('/product', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/product.html'));
})


