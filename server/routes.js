const {
  getAllProducts,
  getWeeklyProducts,
  postProduct
} = require('./db/controllers/product')

module.exports = {
  products: (app) => {
    app.get('/home/products', (req, res) => {
      getAllProducts(res)
    })
    app.get('/home/weeklyProducts', (req, res) => {
      getWeeklyProducts(res)
    })
    app.post('/home/product', (req, res) => {
      postProduct(req, res)
    })
  }
}