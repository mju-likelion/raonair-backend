const Sequelize = require('sequelize');
const User = require('./user');
const Troupe = require('./troupe');
const Play = require('./play');
const Star = require('./star');
const Comment = require('./comment');
const Staff = require('./staff');
const Theater = require('./theater');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Troupe = Troupe;
db.Play = Play;
db.Star = Star;
db.Comment = Comment;
db.Staff = Staff;
db.Theater = Theater;

User.init(sequelize);
Troupe.init(sequelize);
Play.init(sequelize);
Star.init(sequelize);
Comment.init(sequelize);
Staff.init(sequelize);
Theater.init(sequelize);

User.associate(db);
Troupe.associate(db);
Play.associate(db);
Star.associate(db);
Comment.associate(db);
Staff.associate(db);
Theater.associate(db);

module.exports = db;
