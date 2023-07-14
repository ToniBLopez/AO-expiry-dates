const { Schema, model } = require('mongoose')

// Definir el esquema del documento
const storeSchema = new Schema({
  store: {
    type: Number,
    max: [500, 'Store must be a maximum of 500'],
    required: true,
  },
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