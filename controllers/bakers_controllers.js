// dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')

// SEED - only necessary on initial set up. Comment out otherwise.
// baker.get('/data/seed', (req, res) => {
//   Baker.insertMany(bakerSeedData)
//     .then(bakers => {
//       res.redirect('/breads')
//     })
// })

// INDEX
baker.get('/', (req, res) => {
  Baker.find()
    .populate('breads')
    .then(foundBakers => {
      res.send(foundBakers)
    })
})

// SHOW
baker.get('/:id', (req, res) => {
  Baker.findById(req.params.id)
    .populate('breads')
    .then(foundBaker => {
      res.render('bakerShow', {
        baker: foundBaker
      })
    })
})

// DELETE
baker.delete('/:id', async (req, res) => {
  try {
    await Baker.findByIdAndDelete(req.params.id)
    res.status(303).redirect('/breads')
  } catch(e) {
    res.render('error404')
  }
})

// export
module.exports = baker