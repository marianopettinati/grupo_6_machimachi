const productos = [
    {
        id: 1,
        name: 'Sweater Bowie',
        price: '$4500',
        img: '/images/IMG_0503.jpg',
        gender: 'Niñas',
    },
    {
        id: 2,
        name: 'Sweater Freddie',
        price: '$4500',
        img: '/images/IMG_0501.jpg',
        gender: 'Niños',
    },
    {
        id: 3,
        name: 'Gorrito cebra',
        price: '$2200',
        img: '/images/IMG_gorrito_Cebra.jpg',
        gender: 'Niños',
    },
    {
        id: 4,
        name: 'Gorrito frutilla',
        price: '$2200',
        img: '/images/IMG_gorrito_Frutilla.jpg',
        gender: 'Niñas',
    },
    {
        id: 5,
        name: 'Chaleco bosque',
        price: '$4500',
        img: '/images/IMG_0498.jpg',
        gender: 'Niños',
    },
    {
        id: 6,
        name: 'Gorrito tricolor',
        price: '$2200',
        img: '/images/IMG_0502.jpg',
        gender: 'Niños',
    },
]

const producto = (id) => {
    let producto;
    productos.forEach((item) => {
        if(item.id==id){
            producto=item;
        }
    });
    return producto;
}

const product = (req, res) => {
    res.render('product', {productos: productos});
};

const viewProduct = (req, res) => {
    let idProducto = req.params.id;
    res.render('product', {producto: producto(idProducto), productos: productos});
}

const newProduct = (req,res) => {
    res.render ('productAdd', {});
}

const productController = {
    product,
    viewProduct,
    
}

// Acá exportamos el resultado
module.exports = productController;