const {Sequelize} = require("sequelize");

module.exports = class Star extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            star: {
                type: Sequelize.INTEGER(10),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            paranoid: false,
            modelName: 'star',
            tableName: 'stars',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Star.belongsTo(db.User, { foreignKey: 'user', targetKey: 'id' });
        db.Star.belongsTo(db.Play, { foreignKey: 'play', targetKey: 'id'});
    }
};