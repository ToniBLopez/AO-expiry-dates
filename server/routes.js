const {
  postProduct,
  getWeeklyProducts,
  getAllProducts,
  getNotDoneProducts,
  getDoneProducts,
  updateProductDone,
  deleteAllProducts
} = require('./db/controllers/products')

module.exports = {
  products: (app) => {
    app.post('/products/createOne', (req, res) => {
      postProduct(req, res)
    })
    app.get('/products/weekly', (req, res) => {
      getWeeklyProducts(res)
    })
    app.get('/products/all', (req, res) => {
      getAllProducts(res)
    })
    app.get('/products/notDone', (req, res) => {
      getNotDoneProducts(res)
    })
    app.get('/products/done', (req, res) => {
      getDoneProducts(res)
    })
    app.patch('/products/updateDone', (req, res) => {
      updateProductDone(req, res)
    })
    app.delete('/products/deleteAll', (req, res) => {
      deleteAllProducts(res)
    })
  }
}