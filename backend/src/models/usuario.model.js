const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    primer_nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    segundo_nombre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    primer_apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    segundo_apellido: {
        type: DataTypes.STRING,
        allowNull: true
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen_perfil: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        tableName: 'Usuario',
        timestamps: false
    }
)

module.exports = Usuario