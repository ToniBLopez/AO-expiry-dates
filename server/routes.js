const {
  postProduct,
  getWeeklyProducts,
  getAllProducts,
  getNotDoneProducts,
  getDoneProducts,
  updateProductDone,
  deleteAProduct,
  deleteAllProducts
} = require('./db/controllers/products')
const {
  login,
} = require('./db/controllers/auth')

module.exports = {
  login: (app) => {
    app.post('/login', (req, res) => {
      login(req, res)
    })
  },
  products: (app) => {
    app.post('/products/createOne', (req, res) => {
      postProduct(req, res)
    })
    app.get('/products/weekly', (req, res) => {
      getWeeklyProducts(req, res)
    })
    app.get('/products/all', (req, res) => {
      getAllProducts(req, res)
    })
    app.get('/products/notDone', (req, res) => {
      getNotDoneProducts(req, res)
    })
    app.get('/products/done', (req, res) => {
      getDoneProducts(req, res)
    })
    app.patch('/products/updateDone', (req, res) => {
      updateProductDone(req, res)
    })
    app.delete('/products/deleteOne', (req, res) => {
      deleteAProduct(req, res)
    })
    app.delete('/products/deleteAll', (req, res) => {
      deleteAllProducts(res)
    })
  }
}