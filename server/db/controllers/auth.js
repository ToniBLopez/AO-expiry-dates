const mongoose = require('mongoose')
const Store = require('../models/store')

// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const path = require('path')

// require("dotenv").config({ path: path.resolve(__dirname, '../../.env') })

const authCollection = {
  login: async (req, res) => {
    const { store } = req.body
    console.log(store) // '067'
    console.log(Number(store)) // 67
    try {
      const response = await Store.find({ store: 24 })
      const storeId = response[0]._id // ID de la tienda
      if (!mongoose.Types.ObjectId.isValid(storeId)) {
        console.log('invalid ID type')
        return res.status(400).json({ message: 'Store not found' });
      }
      // const response2 = await Store.findById({storeId})
      res.status(200).json({ storeId, message: 'Login successful' })
    }
    catch (error) {
      res.status(500).json({ error, message: error.message })
    }
  }
}

module.exports = authCollection