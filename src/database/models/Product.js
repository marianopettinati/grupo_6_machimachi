module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    
    let cols = {
        id_product: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.STRING
        },
        img: {
            type: dataTypes.STRING
        },
        gender: {
            type: dataTypes.STRING
        },
        discount: {
            type: dataTypes.FLOAT
        }
    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate((models) => {
        Product.belongsToMany(models.Cart, {
            as: "carts",
            through: "details_cart",
            foreignKey: "id_product",
            otherKey: "id_cart",
            timestamps: false
        });
        Product.belongsToMany(module.Size, {
            as: "sizes",
            through: "products_size",
            foreignKey: "id_product",
            otherKey: "id_size",
            timestamps: false
        });
    })
    
    return Product;
}