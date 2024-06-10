const { DataTypes } = require('sequelize');


const sequelize = require(`${process.cwd()}/config/database`);


const permission = sequelize.define(
    'permission',
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
        displayName:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },

    },
    {
        timestamps: false,
        freezeTableName: true,
        modelName: 'permission',
        schema: 'auth',
    }
);

module.exports = permission;
