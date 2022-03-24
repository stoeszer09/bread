const express = require('express')
const { redirect } = require('express/lib/response')
const breads = express.Router()
const Bread = require('../models/bread.js')
const breadSeed = require('../models/bread_seed.js')
const Baker = require('../models/baker.js')

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
  Baker.find()
    .then(foundBakers => {
      res.render('new', {
        bakers: foundBakers
      })
    })
})

// EDIT 
breads.get('/:indexArray/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      Bread.findById(req.params.indexArray)
      .then(foundBread => {
        res.render('edit', {
          bread: foundBread,
          bakers: foundBakers
        })
      })
    })
})

// SHOW
breads.get('/:arrayIndex', (req, res) => {
  Bread.findById(req.params.arrayIndex)
    .populate('baker')
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