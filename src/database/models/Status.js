module.exports = (sequelize, dataTypes) => {
    let alias = "Status";
    
    let cols = {
        id_status: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        description: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "status",
        timestamps: false
    }

    let Status = sequelize.define(alias, cols, config);

    Status.associate = (models) => {
        Status.hasMany(models.Cart, {
            as: "carts",
            foreignKey: "id_status"
        });
    }
    
    return Status;
}