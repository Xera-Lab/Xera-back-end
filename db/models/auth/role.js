const { DataTypes } = require('sequelize');


const sequelize = require(`${process.cwd()}/config/database`);


const role = sequelize.define(
    'role',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        displayName: {
            type: DataTypes.STRING,
            unique: true
        },

    },
    {
        timestamps: false,
        freezeTableName: true,
        modelName: 'role',
        schema: 'auth',
    }
);

permission = require('./permission');
role.belongsToMany(permission, { through: 'role_permissions' });
permission.belongsToMany(role, { through: 'role_permissions' });


module.exports = role;
