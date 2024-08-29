require('dotenv').config({ path: `${process.cwd()}/.env.staging` });

module.exports = {
    local: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.DB_PORT,
        host: process.env.POSTGRES_HOST || 'localhost',
        dialect: 'postgres', // This is the database type
        seederStorage: 'sequelize',
        logging: (msg) => {
            console.log("\x1b[35m", msg, "\x1b[0m");
        }
    },
    stag: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.DB_PORT,
        host: process.env.POSTGRES_HOST || 'localhost',
        dialect: 'postgres',
        seederStorage: 'sequelize',
        logging: (msg) => {
            console.log("\x1b[35m", msg, "\x1b[0m");
        }
    },
    prod: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST || 'localhost',
        port: process.env.DB_PORT,
        dialect: 'postgres',
    },
};