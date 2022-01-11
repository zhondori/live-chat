const { Sequelize, DataTypes } = require("sequelize");
const { DB_URL } = require("../../config");
const { UserModel, MessageModel } = require("../models/Models");


module.exports = async () => {
    const sequelize = new Sequelize(DB_URL, {
        logging: (log) => console.log('SQL ' + log),

    });
    try {
        const db = {};
        db.users = await UserModel(sequelize, Sequelize);
        db.messages = await MessageModel(sequelize, Sequelize);
        await db.users.hasMany(db.messages, {
            foreignKey: {   
                name: "from_id",
                allowNull: false
            }
        })
        await db.messages.belongsTo(db.users, {
            foreignKey: {
                name: "from_id",
                allowNull: false
            }
        });
        await db.users.hasMany(db.messages, {
            foreignKey: {
                name: "to_id",
                allowNull: false
            }
        })
        await db.messages.belongsTo(db.users, {
            foreignKey: {
                name: "to_id",
                allowNull: false
            }
        });

        await sequelize.sync({ force: false });
        return db;
    } catch (err) {
        console.log(`SQL ERROR:  ${err}`)
    }
}           