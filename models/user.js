const {Sequelize} = require("sequelize");

module.exports = class User extends Sequelize.Model {
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
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            emailConfirmed: {
                type: Sequelize.BOOLEAN,
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
    static associate(db){
        // db.User.hasMany(db.Star, { foreignKey: 'star_user', sourceKey: 'id' });
        // db.User.hasMany(db.Comment, { foreignKey: 'comment_user', sourceKey: 'id' });
        // db.User.hasMany(db.Like, { foreignKey: 'like_user', sourceKey: 'id' })
    }
};
