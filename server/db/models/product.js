const { Schema, model } = require('mongoose')

// Definir el esquema del documento
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  expiryDate: {
    type: String,
    required: true,
    minLength: [10, 'Expiry date must have 10 characters'],
    validate: {
      validator: value => {
        const date = new Date(value)
        // Realizar operaciones con la fecha
        const day = String(date.getDate()).padStart(2, '0') // Obtener el día con 2 números
        const month = String(date.getMonth() + 1).padStart(2, '0') // Obtener el mes con 2 números
        const year = date.getFullYear() // Obtener el año
        const validDate = `${day}.${month}.${year}`
        if (!/^\d{2}\.\d{2}\.\d{4}$/.test(validDate)) {
          return false
        }
        if (
          day < 1 || day > 31 ||
          month < 1 || month > 12 ||
          year < 2023 || year > 3000
        ) {
          return false
        }
        return true
      },
      message: () => `No es una fecha de expiración válida`
    }
  },
  done: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
}, {
  collection: 'productsExpiration'
})

// Crear el modelo del documento
const Product = model('Product', productSchema)

module.exports = Product