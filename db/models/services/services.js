const { DataTypes } = require('sequelize');


const sequelize = require(`${process.cwd()}/config/database`);

const service = sequelize.define(
    'service',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        searchName: {
            allowNull: true,
            type: DataTypes.STRING,
            get() {
                return `${this.name}`.toLowerCase().replaceAll(' ', '-')
            }
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        imageUrl: {
            allowNull: true,
            type: DataTypes.STRING
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        paranoid: true,
        freezeTableName: true,
        modelName: 'service',
        schema: 'doctor',
    }
);

service.beforeCreate((service, options) => {
    const searchName = service.name.toLowerCase();
    service.searchName = searchName.replaceAll(' ', '-');
});



module.exports = service;