const {Sequelize} = require("sequelize");

module.exports = class Role extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            type: {
                type: Sequelize.STRING(15),
                // type: Sequelize.ENUM('감독', '제작진', '주연', '조연'),
                // allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            paranoid: false,
            modelName: 'role',
            tableName: 'roles',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Role.belongsTo(db.Person, { foreignKey: 'person_id', targetKey: 'id' });
    }
};