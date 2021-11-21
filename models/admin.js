const {Sequelize} = require("sequelize");
const { truncate } = require("./play");

module.exports = class Admin extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            name: {
                type: Sequelize.STRING(4),
                allowNull: false,
            },
            nickname: {
                type: Sequelize.STRING(10),
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: 'Admin',
            tableName: 'admins',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){}
};
