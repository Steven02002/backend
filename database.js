// database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: false,  // Ajustar según sea necesario
            enableArithAbort: true
        }
    }
});

module.exports = sequelize;
