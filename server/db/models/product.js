const { Schema, model } = require('mongoose')

// Definir el esquema del documento
const productSchema = new Schema({
  // name: String,
  name: {
    type: String,
    required: true
  },
  // expiryDate: String,
  expiryDate: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 10,
    validate: {
      validator: value => value != '24.01.2020',
      message: props => `${props.value} no es una fecha de expiración válida, debe estar separado por puntos y no exceder la cantidad de días (31) y meses (12) `
    }
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
  collection: 'productsExpiration'
})

// Crear el modelo del documento
const Product = model('Product', productSchema)

module.exports = Product