const { ObjectId } = require('mongodb')
const Store = require('../models/store')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const path = require('path')

// require("dotenv").config({ path: path.resolve(__dirname, '../../.env') })

const authCollection = {
  // login: (req, res) => {
  //   console.log('dentro de login en el servidor')
  //   const { store } = req.body
  //   try {
  //     db.collection(collectionName)
  //       .findOne({ store: store })
  //       .then(userExist => {
  //         if (!userExist) {
  //           res.status(404).json({ error: 'Store does not exist' })
  //         } else {
  //           bcrypt.compare(password, userExist.password, (err, match) => {
  //             if (match) { // Create a token
  //               // Payload of the token
  //               const token = jwt.sign(
  //                 { id: userExist._id },
  //                 process.env.JWT_SECRET,
  //                 { expiresIn: '1h' }
  //               )
  //               delete userExist.password
  //               res.status(200).json({
  //                 token,
  //                 user: userExist,
  //               })
  //             } else {
  //               res.status(406).json({ error: 'Incorrect password' })
  //             }
  //           })
  //         }
  //       })
  //       .catch(err => {
  //         res.status(500).json({ error: err.message })
  //       })
  //   } catch (err) {
  //     res.status(500).json({ error: err.message })
  //   }
  // }
  login: (req, res) => {
    try {
      console.log('dentro de login en el servidor')
      console.log(req.body)
      const { store } = req.body
      console.log(store)
    }
    catch (err) {
      res.status(500).json({ error: err, message: err.message })
    }
  }
}

module.exports = authCollection