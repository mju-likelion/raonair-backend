const {Sequelize} = require("sequelize");

module.exports = class Person extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            name: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            paranoid: false,
            modelName: 'person',
            tableName: 'persons',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Person.hasMany(db.Role, { foreignKey: 'person_id', targetKey: 'id' });
    }
};