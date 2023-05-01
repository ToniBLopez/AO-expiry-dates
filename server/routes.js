const {
  getAllProducts,
  getWeeklyProducts,
  postProduct
} = require('./db/controllers/products')

module.exports = {
  products: (app) => {
    app.get('/products/all', (req, res) => {
      getAllProducts(res)
    })
    app.get('/products/weekly', (req, res) => {
      getWeeklyProducts(res)
    })
    app.post('/products/createOne', (req, res) => {
      postProduct(req, res)
    })
  }
}