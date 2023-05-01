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
    // maxLength: 10,
    // validate: {
    //   validator: value => {
    //     // Comprobar que la fecha está en el formato correcto
    //     if (!/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
    //       return false;
    //     }

    //     const [day, month, year] = value.split('.');
    //     const numericDay = Number(day);
    //     const numericMonth = Number(month);
    //     const numericYear = Number(year);

    //     // Comprobar que el día, mes y año son válidos
    //     if (
    //       numericDay < 1 || numericDay > 31 ||
    //       numericMonth < 1 || numericMonth > 12 ||
    //       numericYear < 2023 || numericYear > 2150
    //     ) {
    //       return false;
    //     }

    //     return true;
    //   },
    //   message: props => `${props.value} no es una fecha de expiración válida, debe estar separado por puntos y no exceder la cantidad de días (31) y meses (12) `
    // }
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