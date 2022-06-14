module.exports = (sequelize, dataTypes) => {
    let alias = "ProductSize";
    let cols = {
        id_products_size: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        stock: {
            type: dataTypes.INTEGER
        },
        id_product: {
            type: dataTypes.INTEGER
        },
        id_size: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "products_size",
        timestamps: false
    }

    let ProductSize = sequelize.define(alias, cols, config);

    return ProductSize;
}