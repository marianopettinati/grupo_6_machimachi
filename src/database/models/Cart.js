module.exports = (sequelize, dataTypes) => {
    let alias = "Cart";
    
    let cols = {
        id_cart: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        coupon: {
            type: dataTypes.STRING
        },
        sub_total: {
            type: dataTypes.INTEGER
        },
        total: {
            type: dataTypes.INTEGER
        },
        id_status: {
            type: dataTypes.INTEGER
        },
        id_user: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: "carts",
        timestamps: false
    }

    let Cart = sequelize.define(alias, cols, config);

    Cart.associate = (models) => {
        Cart.belongsToMany(models.Product, {
            as: "products",
            through: "details_cart",
            foreignKey: "id_cart",
            otherKey: "id_product",
            timestamps: false
        });

        Cart.belongsTo(models.User, {
            as: "user",
            foreignKey: "id_user"
        });

        Cart.belongsTo(models.Status, {
            as: "status",
            foreignKey: "id_status"
        });
    }
    
    return Cart;
}