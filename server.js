// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT

// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(methodOverride('_method'))
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
  () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
  
// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// bakers
const bakersController = require('./controllers/bakers_controllers.js')
app.use('/bakers', bakersController)

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads')
})

// 404 Page
app.get('*', (req, res) => {
  res.render('error404')
})

// LISTEN
app.listen(PORT, () => {
  console.log('nomming at port', PORT);
})

