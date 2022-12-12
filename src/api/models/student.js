module.exports = (sequelize, DataTypes) => {
	const Students = sequelize.define('Students', {
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_image: {
			type: DataTypes.STRING,
			allowNull: true,
		}

	}, {});
	
	return Students;
};