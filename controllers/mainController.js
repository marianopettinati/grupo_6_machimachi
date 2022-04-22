// Acá nos falta nuestra fuente de datos
//array de productos
const productos = [
   {
    nombre: "gorro cebra",
    precio: 450,
    img: 'images/Gorrito cebra.png',     
    }, 
]; 


// Acá nos falta un objeto literal con las acciones para cada ruta


const home = (req, res) => {
    res.render('home', {productos: productos});
}

const mainController = {
    home,
}

// Acá exportamos el resultado
module.exports = mainController;