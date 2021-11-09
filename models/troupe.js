const Sequelize = require('sequelize');

module.exports = class Troupe extends Sequelize.Model {
        static init(sequelize){
            return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            troupe_type: {
                type: Sequelize.ENUM('student', 'normal'),
                allowNull: false,
            },
            logo: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Troupe',
            tableName: 'troupes',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        // db.Troupe.hasMany(db.Play, {foreignKey: 'troupe', sourceKey: 'id' });
    }
};
