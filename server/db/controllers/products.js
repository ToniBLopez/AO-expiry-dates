const mongoose = require('mongoose')
const Product = require('../models/product')

const productsCollection = {
  postProduct: async (req, res) => {
    try {
      const { name, expiryDate } = req.body
      const dateParts = expiryDate.split('.') // ['30', '04', '2023']
      const dateObject = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`) // '2023-04-30T00:00:00.000Z'
      const isoString = dateObject.toISOString() // '2023-04-30T00:00:00.000Z'
      const product = await Product.create({
        name,
        expiryDate: isoString,
      })
      console.log(product)
      res.status(200).json(product)
    } catch (err) {
      res.status(500).json(err.message)
    }
  },
  getWeeklyProducts: async (res) => {
    try {
      const today = new Date()
      const weekStartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString()
      const weekEndDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).toISOString()
      const productsData = await Product.find({
        expiryDate: {
          $gte: weekStartDate,
          $lte: weekEndDate
        }
      })
      console.log(productsData)
      res.status(200).json(productsData)
    } catch (err) {
      console.err(err)
      res.status(500).json({ message: err.message, error: 'Error getting the products of the current week' })
    }
  },
  getAllProducts: async (res) => {
    try {
      const productsData = await Product.find().sort({ expiryDate: 1 })
      console.log(productsData)
      res.status(200).json(productsData)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  getNotDoneProducts: async (res) => {
    try {
      const productsData = await Product.find({ done: false }).sort({ expiryDate: 1 })
      console.log(productsData)
      res.status(200).json(productsData)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  getDoneProducts: async (res) => {
    try {
      const productsData = await Product.find({ done: true }).sort({ expiryDate: 1 })
      console.log(productsData)
      res.status(200).json(productsData)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  updateProductDone: async (req, res) => {
    try {
      const { productId } = req.body
      console.log(`Soy ID: ${productId}`)
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }
      const product = await Product.findById(productId)
      if (!product) {
        console.log('Aquí está el error')
        return res.status(404).json({ message: 'Product not found' })
      }
      product.done = !product.done
      await product.save()
      res.status(200).json({ message: 'Update successful' })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating the product' })
    }
  },
  deleteAllProducts: async (res) => {
    try {
      const result = await Product.deleteMany({})
      console.log(`${result.deletedCount} documents were deleted`)
      res.status(200).json({ message: `${result.deletedCount} documents deleted successfully` })
    } catch (err) {
      console.error('Error deleting documents:', err.message)
      res.status(500).json({ message: 'Error deleting documents' })
    }
  }
}

module.exports = productsCollection