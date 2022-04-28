// Acá nos falta nuestra fuente de datos
//array de productos
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


// Acá nos falta un objeto literal con las acciones para cada ruta


const home = (req, res) => {
    res.render('home', {productos: productos});
}

const mainController = {
    home,
}

// Acá exportamos el resultado
module.exports = mainController;