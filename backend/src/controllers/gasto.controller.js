const sequelize = require('../config/db')
const { Gasto, Presupuesto, Categoria } = require('../models/asociaciones.model')
const response = require('../utils/response.util')
const { Op, fn, col } = require('sequelize')
const dayjs = require('dayjs')

async function createGasto(req, res) {

    const t = await sequelize.transaction()

    try {
        const { nombre_gasto, codigo_categoria, monto, notas } = req.body
        const id_usuario = req.usuario.id

        const presupuesto = await Presupuesto.findOne({
            where: { id_usuario },
            attributes: ['id_presupuesto', 'monto'],
            transaction: t
        })

        if (isNaN(monto) || monto < 0) {
            await t.rollback()
            return response.error(res, 401, 'Monto inválido')
        }

        const montoValidado = parseFloat(
            parseFloat(monto).toFixed(2)
        )

        const nuevo_gasto = await Gasto.create({
            id_presupuesto: presupuesto.id_presupuesto,
            id_usuario,
            nombre_gasto,
            codigo_categoria,
            monto: montoValidado,
            notas: notas || ''

        }, { transaction: t })

        if (parseFloat(presupuesto.monto) <= 0) {
            response.success(res, 'Has superado tu presupuesto establecido', {
                superado: true,
                excedente: montoValidado
            })
        }

        presupuesto.monto = parseFloat(
            (parseFloat(presupuesto.monto) - montoValidado).toFixed(2)
        )

        await presupuesto.save({ transaction: t })
        await t.commit()

        response.success(res, 'Gasto guardado correctamente', {
            id: nuevo_gasto.id_usuario,
            superado: false,
            monto: nuevo_gasto.monto
        })

    } catch (error) {
        await t.rollback()
        response.error(res, 500, 'Error en el servidor al crear gasto')
        console.log('Error inesperado en createGasto', error);
    }
}

async function historyGastos(req, res) {
    try {
        const id_usuario = req.usuario.id

        const gastos = await Gasto.findAll({
            where: { id_usuario },
            order: [['fecha_registro', 'DESC']],
            include: [
                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['categoria'],
                }
            ]
        })

        if (gastos.length === 0) {
            return response.success(res, 'No hay gastos registrados', { gastos })
        }

        const gastosMap = gastos.map(g => ({
            id_gasto: g.id_gasto,
            nombre_gasto: g.nombre_gasto,
            categoria: g.categoria.categoria,
            monto: g.monto,
            fecha_registro: g.fecha_registro,
            notas: g.notas
        }))

        response.success(res, 'Historial de gastos', { gastos: gastosMap })

    } catch (error) {
        response.error(res, 500, 'Error en el servidor al obtener gastos')
        console.log('Error inesperado en historyGasto', error);
    }
}

async function statisticsGastos(req, res) {
    try {

        const id_usuario = req.usuario.id
        const { desde, hasta } = req.query

        if (!desde || !hasta) {
            return response.error(res, 400, 'Proporciona fechas con el formato: YYYY-MM-DD')
        }

        const dateStart = dayjs(desde).startOf('day').toDate()
        const dateEnd = dayjs(hasta).endOf('day').toDate()

        const result = await Gasto.findAll({
            where: { 
                id_usuario,
                fecha_registro: {
                    [Op.between]: [dateStart, dateEnd] 
                }
             },
            attributes: [
                [col('Gasto.codigo_categoria'), 'codigo_categoria'],
                [fn('COUNT', col('Gasto.codigo_categoria')), 'cantidad'],
                [fn('SUM', col('Gasto.monto')), 'total']
            ],
            include: [
                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['categoria']
                }
            ],
            group: ['Gasto.codigo_categoria']
        })

        if (result.length === 0) {
            return response.success(res, 'No hay gastos registrados', {gastos: result})
        }

        const resultMap = result.map(r => ({
            codigo_categoria: r.codigo_categoria,
            categoria: r.categoria.categoria,
            cantidad: r.dataValues.cantidad,
            total: r.dataValues.total
        }))

        response.success(res, 'Éxito', { gastos: resultMap })
    } catch (error) {
        response.error(res, 500, 'Error en el servidor al obtener estadisticas de gastos')
        console.log('Error inesperado en statisticsGastos', error);
    }
}

module.exports = {
    createGasto,
    historyGastos,
    statisticsGastos
}
