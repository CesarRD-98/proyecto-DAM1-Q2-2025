const express = require('express')
const categoriaController = require('../controllers/categoria.controller')
const verifyToken = require('../middlewares/verificarToken.middleware')
const router = express.Router()

router.get('/categorias', verifyToken, categoriaController.getCategorias)

module.exports = router