const {
  getAllProducts,
  postProduct
} = require('./db/controllers/product')

module.exports = {
  products: (app) => {
    app.get('/home/products', (req, res) => {
      getAllProducts(res)
    })
    app.post('/home/product', (req, res) => {
      postProduct(req, res)
    })
  }
}