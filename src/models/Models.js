module.exports = class Models {
    static UserModel(sequelize, Sequelize) {
        return sequelize.define("users", {
            user_id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4
            },
            username: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            full_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            }
        })
    }
    static MessageModel(sequelize, Sequelize) {
        return sequelize.define("messages", {
            text: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false,
            }
        })
    }
}