const viewCart = (req, res) => {
    res.render('productCart', {});
};


const cartController = {
    viewCart,
};

// Acá exportamos el resultado
module.exports = cartController;