const { Sequelize } = require("sequelize");

module.exports = class Troupe_like extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            troupe_like_troupe: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            troupe_like_user: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Troupe_like',
            tableName: 'troupe_likes',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        //db.Troupe_like.belongsTo(db.troupe, { foreignKey: 'troupe_like_troupe', targetKey: 'id'});
        //db.Troupe_like.belongsTo(db.User, { foreignKey: 'troupe_like_user', targetKey: 'id'});
    }
};
