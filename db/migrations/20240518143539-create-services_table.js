'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            {
                tableName: 'service',
                schema: 'doctor'
            },
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                price: {
                    type: Sequelize.DOUBLE,
                    allowNull: false,
                },
                description: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                isActive: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                    defaultValue: true
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                deletedAt: {
                    type: Sequelize.DATE,
                },
            },
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable({
            tableName: 'service',
            schema: 'doctor'
        });
    }
};


