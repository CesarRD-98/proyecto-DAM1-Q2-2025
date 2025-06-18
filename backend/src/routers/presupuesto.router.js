const express = require('express')
const addPresupuesto = require('../controllers/presupuesto.controller')
const verifyToken = require('../middlewares/verificarToken.middleware')
const router = express.Router()

router.put('/perfil-presupuesto', verifyToken, addPresupuesto)

module.exports = router