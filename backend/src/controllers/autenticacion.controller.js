const bcrypt = require('bcryptjs')
const { Usuario, Presupuesto } = require('../models/asociaciones.model')
const response = require('../utils/response.util')
const generateToken = require('../utils/generateToken.util')
const sequelize = require('../config/db')

// autenticacion al iniciar sesion
async function authUsuario(req, res) {
    try {
        const { correo, contrasena } = req.body

        const usuario = await Usuario.findOne({ where: { correo_electronico: correo } })

        if (!usuario) {
            return response.error(res, 404, 'Usuario no registrado')
        }

        const comparePass = await bcrypt.compare(contrasena, usuario.contrasena)

        if (!comparePass) {
            return response.error(res, 401, 'Correo y/o contraseña incorrecta')
        }

        const token = generateToken({
            id: usuario.id_usuario,
            correo: usuario.correo_electronico,
            nombre: usuario.primer_nombre
        })

        response.success(res, 'Inicio de sesión exitoso', {
            token,
            usuario: {
                id: usuario.id_usuario,
                correo: usuario.correo_electronico
            }
        })

    } catch (error) {
        response.error(res, 500, 'Error en el servidor al autenticar usuario')
        console.log('Error inesperado en authUsuario', error);
    }
}

async function registerUsuario(req, res) {

    const t = await sequelize.transaction()

    try {
        const {
            primer_nombre,
            primer_apellido,
            correo,
            contrasena
        } = req.body

        const usuarioExistente = await Usuario.findOne({
            where: { correo_electronico: correo },
            transaction: t
        })

        if (usuarioExistente) {
            await t.rollback()
            return response.error(res, 409, 'El correo ya está registrado')
        }

        const contrasenaHash = await bcrypt.hash(contrasena, 10)

        const nuevoUsuario = await Usuario.create({
            primer_nombre,
            primer_apellido,
            correo_electronico: correo,
            contrasena: contrasenaHash,
            imagen_perfil: 'default.png'
        }, { transaction: t })

        await Presupuesto.create({
            id_usuario: nuevoUsuario.id_usuario,
            monto: 0,
            nombre_presupuesto: 'Presupuesto inicial'
        }, { transaction: t })

        if (!nuevoUsuario) {
            await t.rollback()
            return response.error(res, 400, 'Error en el registro')
        }

        await t.commit()

        response.success(res, 'Registro exitoso', {
            id: nuevoUsuario.id_usuario,
            correo: nuevoUsuario.correo_electronico
        })

    } catch (error) {
        await t.rollback()
        response.error(res, 500, 'Error en el servidor al registrar usuario')
        console.log('Error inesperado en registerUsuario', error);
    }
}

module.exports = {
    authUsuario,
    registerUsuario
}