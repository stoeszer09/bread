// dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')

baker.get('/data/seed', (req, res) => {
  Baker.insertMany(bakerSeedData)
    .then(bakers => {
      res.redirect('/breads')
    })
})

// export
module.exports = baker