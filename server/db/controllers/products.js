const mongoose = require('mongoose')
const Product = require('../models/product')

const productsCollection = {
  postProduct: async (req, res) => {
    try {
      const { store_id, name, expiryDate } = req.body
      console.log('store_id')
      console.log(store_id)
      const dateParts = expiryDate.split('.') // ['30', '04', '2023']
      const dateObject = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`) // '2023-04-30T00:00:00.000Z'
      const isoString = dateObject.toISOString() // '2023-04-30T00:00:00.000Z'
      const storeId = new mongoose.Types.ObjectId(store_id)
      const product = await Product.create({
        name,
        expiryDate: isoString,
        storeId,
      })
      console.log('Product added successfully')
      res.status(200).json({ product: product, message: 'Product added successfully' })
    } catch (err) {
      console.log('err')
      console.log(err)
      res.status(500).json({ error: err, message: err.message })
    }
  },
  getWeeklyProducts: async (req, res) => {
    try {
      const storeId = req.query.store
      const today = new Date()
      const weekStartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString()
      const weekEndDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).toISOString()
      const productsData = await Product
        .find({
          $and: [
            {
              storeId,
            },
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
        .sort({ expiryDate: 1 }).populate('storeId') // populate is not having any use here
      console.log('Products obtained successfully. Change app page. Page: Home')
      res.status(200).json(productsData)
    } catch (err) {
      console.err(err)
      res.status(500).json({ message: err.message, error: 'Error getting the products of the current week' })
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const storeId = req.query.store
      const productsData = await Product.find({ storeId, }).sort({ expiryDate: 1 }).populate('storeId') // populate is not having any use here
      console.log('Products obtained successfully. Change app page. Page: All')
      res.status(200).json(productsData)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  getNotDoneProducts: async (req, res) => {
    try {
      const storeId = req.query.store
      const productsData = await Product.find({ $and: [{ storeId, }, { done: false }] }).sort({ expiryDate: 1 })
      console.log('Products obtained successfully. Change app page. Page: Not Done')
      res.status(200).json(productsData)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  getDoneProducts: async (req, res) => {
    try {
      const storeId = req.query.store
      const productsData = await Product.find({ $and: [{ storeId, }, { done: true }] }).sort({ expiryDate: 1 })
      console.log('Products obtained successfully. Change app page. Page: Done')
      res.status(200).json(productsData)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  updateProductDone: async (req, res) => {
    try {
      const { storeId, productId, page } = req.body
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }
      if (!mongoose.Types.ObjectId.isValid(storeId)) {
        return res.status(400).json({ message: 'Invalid store ID' });
      }
      const product = await Product.findOne({ _id: productId, storeId })
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
                    storeId,
                  },
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
            console.log('Products obtained successfully. Updated Check. Page: Home')
            break;
          case 'all':
            productsData = await Product.find({ storeId, }).sort({ expiryDate: 1 })
            console.log('Products obtained successfully. Updated Check. Page: All')
            break;
          case 'done':
            productsData = await Product.find({ $and: [{ storeId, }, { done: true }] }).sort({ expiryDate: 1 })
            console.log('Products obtained successfully. Updated Check. Page: Done')
            break;
          case 'not done':
            productsData = awaitProduct.find({ $and: [{ storeId, }, { done: false }] }).sort({ expiryDate: 1 })
            console.log('Products obtained successfully. Updated Check. Page: Not Done')
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
      const { storeId, productId } = req.body
      const result = await Product.deleteOne({ _id: productId, storeId })
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