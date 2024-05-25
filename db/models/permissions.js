const { DataTypes } = require('sequelize');


const sequelize = require(`${process.cwd()}/config/database`);


const permissions = sequelize.define(
    'permissions',
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
        description: {
            type: DataTypes.STRING,
        },

    },
    {
        timestamps: false,
        freezeTableName: true,
        modelName: 'permissions',
    }
);

module.exports = permissions;
