const express = require('express')
const { redirect } = require('express/lib/response')
const bread = require('../models/bread.js')
const breads = express.Router()
const Bread = require('../models/bread.js')
const breadSeed = require('../models/bread_seed.js')

// INDEX
breads.get('/', (req, res) => {
  Bread.find()
    .then(foundBreads => {
      res.render('Index', { 
        breads: foundBreads,
        title: 'Index Page' 
      })
    })
    .catch(err => {
      res.send('error404')
    })
})

// SEED
breads.get('/data/seed', (req, res) => {
  Bread.insertMany(breadSeed)
    .then(createdBreads => {
      res.redirect('/breads')
    })
})

// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})

// EDIT 
breads.get('/:indexArray/edit', (req, res) => {
  Bread.findById(req.params.indexArray)
    .then(foundBread => {
      res.render('edit', {
        bread: foundBread
      })
    })
})

// SHOW
breads.get('/:arrayIndex', (req, res) => {
  Bread.findById(req.params.arrayIndex)
    .then(foundBread => {
      res.render('show', {bread: foundBread})
    })
    .catch(err => {
      res.send('error404')
    })
})

// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.arrayIndex, req.body, {new: true})
    .then(updatedBread => {
      res.redirect(`/breads/${req.params.arrayIndex}`)
    })
})

// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// DELETE
breads.delete('/:indexArray', (req, res) => {
  Bread.findByIdAndDelete(req.params.indexArray)
    .then(deletedBread => {
      res.status(303).redirect('/breads')
    })
})

module.exports = breads