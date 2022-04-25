const productos = [
    {}
]

const product = (req, res) => {
    res.render('product', {productos: productos});
};

const productController = {
    product,
}

// Acá exportamos el resultado
module.exports = productController;