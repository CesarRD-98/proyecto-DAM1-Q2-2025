const { Presupuesto } = require('../models/asociaciones.model')
const response = require('../utils/response.util')

async function addPresupuesto(req, res) {
    try {
        const id_usuario = req.usuario.id
        const { monto, nombre_presupuesto, notas } = req.body

        const presupuesto_usuario = await Presupuesto.findOne({ where: { id_usuario } })

        if (!presupuesto_usuario) {
            return response.error(res, 404, 'No existe presupuesto para esta cuenta')
        }

        if (isNaN(monto) || monto < 0) {
            return response.error(res, 401, 'Monto inválido')
        }

        presupuesto_usuario.monto = parseFloat(
            (parseFloat(presupuesto_usuario.monto) + parseFloat(monto)).toFixed(2)
        )

        presupuesto_usuario.nombre_presupuesto = nombre_presupuesto
        presupuesto_usuario.notas = notas || ''

        await presupuesto_usuario.save()

        response.success(res, 'Presupuesto actualizado correctamente', {
            monto: presupuesto_usuario.monto
        })

    } catch (error) {
        response.error(res, 500, 'Error en el servidor al agregar presupuesto')
        console.log('Error inesperado en addPresupuesto', error);
    }
}

module.exports = addPresupuesto