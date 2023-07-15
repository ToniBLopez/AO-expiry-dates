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
      console.log('Product added successfully')
      res.status(200).json({ product: product, message: 'Product added successfully' })
    } catch (err) {
      console.log('err')
      console.log(err)
      console.log(err.error)
      res.status(500).json({ error: err, message: err.message })
    }
  },
  getWeeklyProducts: async (res) => {
    try {
      const today = new Date()
      const weekStartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString()
      const weekEndDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).toISOString()
      const productsData = await Product
        .find({
          $and: [
            {
              expiryDate: {
                $gte: weekStartDate,
                $lte: weekEndDate
              }
            },
            {
              done: false
            },
          ]
        })
        .sort({ expiryDate: 1 })
      console.log('Products obtained successfully, page: Home')
      res.status(200).json(productsData)
    } catch (err) {
      console.err(err)
      res.status(500).json({ message: err.message, error: 'Error getting the products of the current week' })
    }
  },
  getAllProducts: async (res) => {
    try {
      const productsData = await Product.find().sort({ expiryDate: 1 })
      console.log('Products obtained successfully, page: All')
      res.status(200).json(productsData)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  getNotDoneProducts: async (res) => {
    try {
      const productsData = await Product.find({ done: false }).sort({ expiryDate: 1 })
      console.log('Products obtained successfully, page: Not Done')
      res.status(200).json(productsData)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  getDoneProducts: async (res) => {
    try {
      const productsData = await Product.find({ done: true }).sort({ expiryDate: 1 })
      console.log('Products obtained successfully, page: Done')
      res.status(200).json(productsData)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  updateProductDone: async (req, res) => {
    try {
      const { productId, page } = req.body
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }
      const product = await Product.findById(productId)
      if (!product) {
        console.log('Product not found in: updateProductDone')
        return res.status(404).json({ message: 'Product not found' })
      }
      product.done = !product.done
      await product.save()

      let productsData
      try {
        console.log('page')
        console.log(page)
        switch (page) {
          case 'home':
            const today = new Date()
            const weekStartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString()
            const weekEndDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).toISOString()
            productsData = await Product
            .find({
              $and: [
                {
                  expiryDate: {
                    $gte: weekStartDate,
                    $lte: weekEndDate
                  }
                },
                {
                  done: false
                },
              ]
            })
              .sort({ expiryDate: 1 })
            console.log('Products obtained successfully. Page: Home')
            break;
          case 'all':
            productsData = await Product.find().sort({ expiryDate: 1 })
            console.log('Products obtained successfully. Page: All')
            break;
          case 'done':
            productsData = await Product.find({ done: true }).sort({ expiryDate: 1 })
            console.log('Products obtained successfully. Page: Done')
            break;
          case 'not done':
            productsData = await Product.find({ done: false }).sort({ expiryDate: 1 })
            console.log('Products obtained successfully. Page: Not Done')
            break;
        }
        res.status(200).json({ message: 'Update successful', products: productsData, })
      } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error updating the product' })
    }
  },
  deleteAProduct: async (req, res) => {
    try {
      const { productId } = req.body
      const result = await Product.deleteOne({ _id: productId })
      console.log(`${result.deletedCount} document successfully deleted`)
      res.status(200).json({ result: result, message: `Document successfully deleted` })
    } catch (err) {
      console.error('Error deleting document:', err)
      res.status(500).json({ err, message: err.message })
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