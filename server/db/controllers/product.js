const Product = require('../models/product')

const productsCollection = {
  getAllProducts: async (res) => {
    try {
      const productsData = await Product.find().sort({ expiryDate: 1 })
      console.log(productsData)
      res.status(200).json(productsData)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  getWeeklyProducts: async (res) => {
    const today = new Date();
    const weekStartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()).toISOString();
    const weekEndDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6).toISOString();
    try {
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
  // getNotDoneProducts: async (res) => {
  //   try {
  //     const productsData = await Product.find().sort({ expiryDate: 1 })
  //     console.log(productsData)
  //     res.status(200).json(productsData)
  //   } catch (err) {
  //     res.status(500).json({ message: err.message })
  //   }
  // },
  // getDoneProducts: async (res) => {
  //   try {
  //     const productsData = await Product.find().sort({ expiryDate: 1 })
  //     console.log(productsData)
  //     res.status(200).json(productsData)
  //   } catch (err) {
  //     res.status(500).json({ message: err.message })
  //   }
  // },
  postProduct: async (req, res) => {
    try {
      const { name, expiryDate } = req.body
      const dateParts = expiryDate.split('.') // ['30', '04', '2023']
      const dateObject = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`) // '2023-04-30T00:00:00.000Z'
      const isoString = dateObject.toISOString() // '2023-04-30T00:00:00.000Z'
      const product = await Product.create({
        name,
        expiryDate: isoString,
        // expiryDate,
      })
      console.log(product)
      res.status(200).json(product)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }
}

module.exports = productsCollection