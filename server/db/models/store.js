const { Schema, model } = require('mongoose')

// Definir el esquema del documento
const storeSchema = new Schema({
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  },
}, {
  collection: 'stores'
})

// Crear el modelo del documento
const Store = model('Store', storeSchema)

module.exports = Store