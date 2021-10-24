const Sequelize = require('sequelize');

module.exports = class Play extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            location: {
                type: Sequelize.ENUM('서울','경기','부산','광주','강원','인천','충청','전라','경상','제주'),
            },
            poster: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            end_date: {
                type: Sequelize.DATE,
            },
            running_time: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false, 
            },
            troupe: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            theater: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            yes24_external_link: {
                type: Sequelize.STRING(100),
                unique: true,
            },
            interpark_external_link: {
                type: Sequelize.STRING(100),
                unique: true,
            },
            playDB_external_link: {
                type: Sequelize.STRING(100),
                unique: true,
            },
            cultureGov_external_link: {
                type: Sequelize.STRING(100),
                unique: true,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Play',
            tableName: 'plays',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Play.belongsTo(db.Troupe, { foreignKey: 'troupe', targetKey: 'id'});
        db.Play.hasMany(db.Star, {foreignKey: 'play', sourceKey: 'id' });
        // db.Play.hasMany(db.Commnet, {foreignKey: 'play', sourceKey: 'id' });
    }
};
