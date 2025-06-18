const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Categoria = sequelize.define('Categoria',
    {
        codigo_categoria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'Categoria',
        timestamps: false
    }
)

module.exports = Categoria