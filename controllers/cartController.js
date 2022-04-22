const cart = (req, res) => {
    res.render('productCart', {});
};


const cartController = {
    cart,
};

// Acá exportamos el resultado
module.exports = cartController;