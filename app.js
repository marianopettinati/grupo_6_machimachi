const express = require('express');
const routes = require ('./routes/routes');
const app = express();
const path = require('path');

const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

app.listen(3000, ()=>{
    console.log("Servidor corriendo ok");
});

app.set ("view engine", "ejs")

app.use('/', routes);


