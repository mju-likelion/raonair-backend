const {Sequelize} = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            comment: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: true,
            modelName: 'comment',
            tableName: 'comments',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Comment.belongsTo(db.User, { foreignKey: 'users', targetKey: 'id' });
        db.Comment.belongsTo(db.Play, { foreignKey: 'play', targetKey: 'id'});
    }
};