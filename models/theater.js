const {Sequelize} = require("sequelize");

module.exports = class Theater extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            address: {
                type: Sequelize.STRING(10),
                allowNull: false,
                unique: true,
            },
            longitude: {
                type: Sequelize.DOUBLE,
            },
            latitiude: {
                type: Sequelize.DOUBLE,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: true,
            modelName: 'theater',
            tableName: 'theaters',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        // db.Theater.hasMany(db.Play, { foreignKey: 'theater', sourceKey: 'id'})
    }
};