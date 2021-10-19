const Sequelize = require('sequelize');
const User = require('./user');
const Troupe = require('./troupe');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Troupe = Troupe;

User.init(sequelize);
Troupe.init(sequelize);

User.associate(db);
Troupe.associate(db);

module.exports = db;
