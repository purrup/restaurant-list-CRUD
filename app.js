const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true })
const db = mongoose.connection

const exphbs = require('express-handlebars')
// 引用 method-override
const methodOverride = require('method-override')
// 設定 method-override
app.use(methodOverride('_method'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// routers
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))
app.use('/search', require('./routes/search'))

// 引用 body-parser
const bodyParser = require('body-parser')
// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`)
})
