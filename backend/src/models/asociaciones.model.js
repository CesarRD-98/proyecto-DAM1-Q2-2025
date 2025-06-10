const Usuario = require('./usuario.model')
const Presupuesto = require('./presupuesto.model')
const Categoria = require('./categoria.model')
const Gasto = require('./gasto.model')

// Relaciones de cada tabla de la base de datos

// Usuario => Presupuesto
Usuario.hasMany(Presupuesto, { foreignKey: 'id_usuario' })
Presupuesto.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  onDelete: 'CASCADE'
})

// Gasto => Categoria
Gasto.belongsTo(Categoria, {
  foreignKey: 'codigo_categoria',
  as: 'categoria'
})

Categoria.hasMany(Gasto, { foreignKey: 'codigo_categoria' })

// Gasto => Usuario && Presupuesto
Usuario.hasMany(Gasto, { foreignKey: 'id_usuario' })
Presupuesto.hasMany(Gasto, { foreignKey: 'id_presupuesto' })
Gasto.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  onDelete: 'CASCADE'
})
Gasto.belongsTo(Presupuesto, {
  foreignKey: 'id_presupuesto',
  onDelete: 'CASCADE'
})

module.exports = {
  Usuario,
  Presupuesto,
  Gasto,
  Categoria
}
