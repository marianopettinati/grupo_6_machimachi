module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    
    let cols = {
        id_user: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        img: {
            type: dataTypes.STRING
        },
        phone: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        id_type_user: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: "users",
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.hasMany(models.Cart, {
            as: "carts",
            foreignKey: "id_user"
        });

        User.belongsTo(models.TypeUser, {
            as: "type_user",
            foreignKey: "id_type_user"
        })
    }
    
    return User;
}