const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Gasto = sequelize.define('Gasto', {
    id_gasto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_presupuesto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre_gasto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    notas: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        tableName: 'Gasto',
        timestamps: false
    }
)

module.exports = Gasto