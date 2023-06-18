const {sequelize} = require("../db/connect");

const { Sequelize, DataTypes } = require("sequelize");

const user = sequelize.define("sellers", {
	id: {
		autoIncrement: true,
		unique: true,
		allowNull: false,
		type: DataTypes.INTEGER,
        primaryKey:true
	},
	category:{
		type: DataTypes.STRING
	},
	name: { 
		type: DataTypes.STRING,
	},
	price: {
		type: DataTypes.FLOAT,
	},
	
});

module.exports = {user};
