const {Sequelize} = require("sequelize");

module.exports = class Rating extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            rating:{
                type: Sequelize.INTERGER,
                allowNull: false,
            },
            rating_play:{
                type: Sequelize.INTERGER,
                allowNull: false,
            },
            rating_user: {
                type: Sequelize.INTERGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Rating',
            tableName: 'ratings',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf7mb4_general_ci',
        });
    }
    static associate(db){
        //db.Rating.belongsTo(db.Play, {foreignKey: 'rating_play', targetKey:'id'});
        //db.Rating.belongsTo(db.User, {foreignKey: 'rating_user', targetKey: 'id'});
    }
}
