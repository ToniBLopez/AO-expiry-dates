const mongoose = require('mongoose')
const { resolve } = require('path')

require("dotenv").config({ path: resolve(__dirname, '../.env')})
const dbName = process.env.MONGO_URL || 'mongodb://localhost:27017/myfirst-database'

module.exports = {
  connectToDb: (cb) => {
    mongoose.connect(dbName, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => cb())
    .catch((err) => {
      console.error(`Error de conexión a MongoDB: ${err}`)
      return cb(err)
    })
  },
  // getDb: () => mongoose.connection
}