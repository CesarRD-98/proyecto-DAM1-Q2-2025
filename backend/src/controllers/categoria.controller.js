const response = require('../utils/response.util')
const { Categoria } = require('../models/asociaciones.model')

async function getCategorias(req, res) {
    try {
        const categorias = await Categoria.findAll()

        if (categorias.length === 0) {
            response.error(res, 404, 'No se encontraron resultados')
        }

        response.success(res, 'Éxito', categorias)
    } catch (error) {
        response.error(res, 500, 'Error en el servidor')
        console.log('Error inesperado en getCategorias', error);
    }
}

module.exports = {
    getCategorias
}