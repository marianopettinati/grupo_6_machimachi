module.exports = (sequelize, dataTypes) => {
    let alias = "DetailCart";
    
    let cols = {
        id_details_cart: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        id_cart: {
            type: dataTypes.INTEGER
        },
        id_product: {
            type: dataTypes.INTEGER
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        sub_total: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: "details_cart",
        timestamps: false
    }

    let DetailCart = sequelize.define(alias, cols, config);
    
    return DetailCart;
}