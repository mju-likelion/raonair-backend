const {Sequelize} = require("sequelize");

module.exports = class Team extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            team_person:{
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            team_troupe: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Team',
            tableName: 'teams',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        // 아직 연관관계 설정안됨
        //db.Team.belongsTo(db.Person, {foreignKey: 'team_person', targetKey:'id'});
        //db.Team.belongsTo(db.Troupe, {foreignKey: 'team_troupe', targetKey: 'id'});
    }
}
