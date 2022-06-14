module.exports = (sequelize, dataTypes) => {
    let alias = "Size";
    let cols = {
        id_size: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        description: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "sizes",
        timestamps: false
    };

    let Size = sequelize.define(alias, cols, config);

    Size.association((models) => {
        Size.belongsToMany(module.Product, {
            as: "products",
            through: "products_size",
            foreignKey: "id_size",
            otherKey: "id_product",
            timestamps: false
        });
    });

    return Size;
}