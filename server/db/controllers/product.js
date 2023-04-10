const Product = require('../models/product')

const productsCollection = {
  getAllProducts: async (res) => {
    try {
      const productsData = await Product.find()
      console.log(productsData)
      res.status(200).json(productsData)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  postProduct: async (req, res) => {
    try {
      const {name, expiryDate} = req.body
      const product = await Product.create({
        name,
        expiryDate,
      })
      console.log(product)
      res.status(200).json(product)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }
}

module.exports = productsCollection