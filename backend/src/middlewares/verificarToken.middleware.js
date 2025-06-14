const jwt = require('jsonwebtoken')
const response = require('../utils/response.util')

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) {
        return response.error(res, 401, 'Token no proporcionado')
    }

    const tokenLimpio = token.replace('Bearer ', '')

    try {
        const decodificado = jwt.verify(tokenLimpio, process.env.JWT_SECRET)
        req.usuario = decodificado
        next()
    } catch (error) {
        return response.error(res, 401, 'Token inválido o expirado')
    }
}

module.exports = verifyToken