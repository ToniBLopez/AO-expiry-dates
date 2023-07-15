const mongoose = require('mongoose')
const Store = require('../models/store')

// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')

require("dotenv").config({ path: path.resolve(__dirname, '../../.env') })

const authCollection = {
  login: async (req, res) => {
    try {
      const { store } = req.body
      if (Number(store) >= 500) { // Number(store) = 67 (pasa de string a número entero)
        console.log('The store number is too high. Number: ' + store)
        return res.status(400).json({ message: 'The store number is too high' })
      }
      const response = await Store.find({ store, })
      const storeId = response[0]._id // ID de la tienda
      if (!mongoose.Types.ObjectId.isValid(storeId)) {
        console.log('invalid ID type')
        return res.status(400).json({ message: 'Store not found, invalid ID type' })
      }
      const token = jwt.sign(
        { id: storeId },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )
      // const response2 = await Store.findById({storeId})
      res.status(200).json({ storeId, message: 'Login successful', token, })
    }
    catch (error) {
      res.status(500).json({ error, message: error.message })
    }
  }
}

module.exports = authCollection