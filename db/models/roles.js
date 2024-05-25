const { DataTypes } = require('sequelize');


const sequelize = require(`${process.cwd()}/config/database`);


const roles = sequelize.define(
    'roles',
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

    },
    {
        timestamps: false,
        freezeTableName: true,
        modelName: 'roles',
    }
);

permissions = require('./permissions');
roles.belongsToMany(permissions, { through: 'role_permissions' });
permissions.belongsToMany(roles, { through: 'role_permissions' });


module.exports = roles;
