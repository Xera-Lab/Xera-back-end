const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const environment = require('./environment');

const sequelize = new Sequelize(environment[env]);

module.exports = sequelize;