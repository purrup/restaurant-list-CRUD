const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true })
const db = mongoose.connection
const Restaurant = require('./models/restaurant')
const restaurantList = require('./restaurant.json')
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`)
})
