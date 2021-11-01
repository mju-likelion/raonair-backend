const { Sequelize } = require("sequelize");

module.exports = class Like extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            play: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            like_user: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Like',
            tableName: 'likes',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Like.belongsTo(db.Play, { foreignKey: 'play', targetKey: 'id'});
        db.Like.belongsTo(db.User, { foreignKey: 'like_user', targetKey: 'id'});
    }
};
