const express = require('express')
const autenticacionController = require('../controllers/autenticacion.controller')
const router = express.Router()

router.post('/registro', autenticacionController.registerUsuario)
router.post('/autenticacion', autenticacionController.authUsuario)

module.exports = router