module.exports = (sequelize, dataTypes) => {
    let alias = "ProductDetail";
    let cols = {
        id_products_details: {
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
        size: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "products_size",
        timestamps: false
    }

    let ProductDetail = sequelize.define(alias, cols, config);

    ProductDetail.associate = ((models) => {
        ProductDetail.belongsTo(models.TypeUser, {
            as: "product",
            foreignKey: "id_product"
        })
    })

    return ProductDetail;
}