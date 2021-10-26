const {Sequelize} = require("sequelize");

module.exports = class Staff extends Sequelize.Model {
    static init(sequelize){
        return super.init({
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: true,
            modelName: 'staff',
            tableName: 'staffs',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        // db.Staff.belongsTo(db.Person, { foreignKey: 'person', targetKey: 'id' });
        db.Staff.belongsTo(db.Play, { foreignKey: 'play', targetKey: 'id'});
    }
};
