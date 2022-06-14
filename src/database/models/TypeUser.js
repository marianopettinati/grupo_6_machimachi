module.exports = (sequelize, dataTypes) => {
    let alias = "TypeUser";
    
    let cols = {
        id_type_users: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        description: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "type_users",
        timestamps: false
    }

    let TypeUser = sequelize.define(alias, cols, config);

    TypeUser.associate = (models) => {
        TypeUser.hasMany(models.User, {
            as: "users",
            foreignKey: "id_type_user"
        })
    }
    
    return TypeUser;
}