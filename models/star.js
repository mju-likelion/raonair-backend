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
            timestamps: true,
            underscored: false,
            paranoid: true,
            modelName: 'star',
            tableName: 'stars',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Star.belongsTo(db.User, { foreignKey: 'users', targetKey: 'id' });
        db.Star.belongsTo(db.Play, { foreignKey: 'play', targetKey: 'id'});
    }
};