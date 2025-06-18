const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        timezone: '-06:00' // => horario de America Central
    }
)

async function verifyConnection() {
    try {
        await sequelize.authenticate()
        console.log('Conexion a base de datos exitosa');
    } catch (error) {
        console.log('Conexion a base de datos fallida: ', error);
    }
}

verifyConnection()

module.exports = sequelize