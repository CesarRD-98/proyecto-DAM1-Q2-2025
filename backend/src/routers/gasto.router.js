const express = require('express')
const gastoController = require('../controllers/gasto.controller')
const verifyToken = require('../middlewares/verificarToken.middleware')
const router = express.Router()

router.post('/gasto', verifyToken, gastoController.createGasto)
router.get('/gastos', verifyToken, gastoController.historyGastos)
router.get('/estadisticas', verifyToken, gastoController.statisticsGastos)

module.exports = router