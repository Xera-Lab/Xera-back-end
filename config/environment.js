require('dotenv').config({ path: `${process.cwd()}/.env` });

module.exports = {
    development: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        seederStorage: 'sequelize',
    },
    production: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
    },
};