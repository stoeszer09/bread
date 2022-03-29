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
baker.get('/', async (req, res) => {
  try {
    const foundBakers = await Baker.find()
    res.send(foundBakers)
  } catch(e) {
    res.render('error404')
  }
})

// SHOW
// show 
baker.get('/:id', async (req, res) => {
  try {
    const foundBaker = await Baker.findById(req.params.id)
    await foundBaker.populate({
      path: 'breads',
      options: { limit: 2 }
    })
    res.render('bakerShow', {
      baker: foundBaker
    })
  } catch(e) {
    res.render('error404')
  }
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