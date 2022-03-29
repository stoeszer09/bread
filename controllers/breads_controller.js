const express = require('express')
const { redirect } = require('express/lib/response')
const breads = express.Router()
const Bread = require('../models/bread.js')
const breadSeed = require('../models/bread_seed.js')
const Baker = require('../models/baker.js')

// INDEX
breads.get('/', async (req, res) => {
  try {
    const foundBakers = await Baker.find().lean()
    const foundBreads = await Bread.find().limit(15).lean()
    res.render('Index', { 
      breads: foundBreads,
      bakers: foundBakers,
      title: 'Index Page' 
    })
  } catch(e) {
    res.send('error404')
  }
})

// SEED
breads.get('/data/seed', async (req, res) => {
  try {
    const createdBreads = await Bread.insertMany(breadSeed)
    res.redirect('/breads')
  } catch(e) {
    res.redirect('error404')
  }
})

// NEW
breads.get('/new', async (req, res) => {
  try {
    const foundBakers = await Baker.find()
    res.render('new', {
      bakers: foundBakers
    })
  } catch (e) {
    res.render('error404')
  }
})

// EDIT 
breads.get('/:indexArray/edit', async (req, res) => {
  try {
    const foundBakers = await Baker.find()
    const foundBread = await Bread.findById(req.params.indexArray)
    res.render('edit', {
      bread: foundBread,
      bakers: foundBakers
    })
  } catch(e) {
    res.render('error404')
  }
})

// SHOW
breads.get('/:arrayIndex', async (req, res) => {
  try {
    const foundBread = await Bread.findById(req.params.arrayIndex)
    res.render('show', {
      bread: foundBread
    })
  } catch(e) {
    res.send('error404')
  }
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