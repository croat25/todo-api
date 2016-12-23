var Sequelize = require('sequelize');


var env = process.env.NODE_ENV || 'development';
var sequelize;
if (env === 'production') {
	//only true if on heroku
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres' //to connect to postgres on heroku
	});
} else {//else run on sqlite
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '/data/dev-todo-api.sqlite'
	});

}

var db = {};

db.todo = sequelize.import(__dirname + '/models/todo.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user=sequelize.import(__dirname +'/models/user.js');


db.todo.belongsTo(db.user);

db.user.hasMany(db.todo);
module.exports = db;