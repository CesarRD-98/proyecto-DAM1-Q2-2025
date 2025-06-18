const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Presupuesto = sequelize.define('Presupuesto', {
    id_presupuesto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    nombre_presupuesto: {
        type: DataTypes.STRING,
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
        tableName: 'Presupuesto',
        timestamps: false
    }
)

module.exports = Presupuesto