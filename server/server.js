const express = require('express')
const path = require('path')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser') // DESCOMENTAR
const cors = require('cors')

require("dotenv").config({ path: path.resolve(__dirname, '.env') })

const {
  connectToDb,
  // getDb
} = require('./db/db')
const routes = require('./routes')

const app = express()
app.use(express.json())
/* ONLY FOR PRODUCTION */
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(helmet.contentSecurityPolicy({ // Set the CSP policy
  directives: {
    defaultSrc: ["'self'"],
    connectSrc: ["'self'", "http://expirydates.fly.dev"],
  }
}))
// Logs HTTP requests arriving to the server in the console
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true })) // DESCOMENTAR
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })) // DESCOMENTAR
app.use(cors())
// Allows the use of files for webpack
app.use(express.static(path.join(__dirname, '../build')))
// Allows the use of static files, in this case images
app.use("/assets", express.static(path.join(__dirname, "../public/assets")))

const PORT = process.env.PORT || 8080

// DB CONNECTION
connectToDb(err => {
  if (!err) {
    app.listen(PORT, () => {
      console.log(`App listening on port: ${PORT}`)
      routes.products(app)
      routes.login(app)
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build/index.html'));
      })
    })
    // getDb()
  }
})