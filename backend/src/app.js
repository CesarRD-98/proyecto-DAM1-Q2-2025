const express = require('express')
const cors = require('cors')
const categoriaRouter = require('./routers/categoria.router')
const usuarioRouter = require('./routers/usuario.router')
const autenticacionRouter = require('./routers/autenticacion.router')
const presupuestoRouter = require('./routers/presupuesto.router')
const gastoRouter = require('./routers/gasto.router')
const app = express()

app.use(express.json())
app.use(cors())

// rutas 
app.use(categoriaRouter) // => da acceso a rutas sobre categorias
app.use(usuarioRouter) // => da acceso a rutas sobre usuarios
app.use(autenticacionRouter) // => da acceso a la autenticacion de inicio de sesion del usuario
app.use(presupuestoRouter) // => da acceso a las rutas sobre el presupuesto
app.use(gastoRouter) // => da acceso a las rutas sobre los gastos

module.exports = app
