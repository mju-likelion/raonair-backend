const {Sequelize} = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            name: {
                type: Sequelize.STRING(5),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: true,
            modelName: 'user',
            tableName: 'users',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){}
};
