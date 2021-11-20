const { Sequelize } = require("sequelize");

module.exports = class Troupe_like extends Sequelize.Model {
    static init(sequelize){
        return super.init({
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
        db.Troupe_like.belongsTo(db.Troupe, { foreignKey: 'troupe', targetKey: 'id'});
        db.Troupe_like.belongsTo(db.User, { foreignKey: 'user', targetKey: 'id'});
    }
};
