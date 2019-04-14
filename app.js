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

// 瀏覽全部餐廳
app.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})

// 前往新增一家餐廳資訊的頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

// 新增一家餐廳
app.post('/restaurants', (req, res) => {
  console.log(req.body.name)
  const restaurant = Restaurant({
    name: req.body.name,
    // name_en: req.body.name_en,
    // category: req.body.category,
    // image: req.body.image,
    // location: req.body.location,
    // phone: req.body.phone,
    // google_map: req.body.google_map,
    // rating: req.body.rating,
    // description: req.body.description,
  })
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 瀏覽一家餐廳的詳細資訊
app.get('/restaurants/:id/detail', (req, res) => {})

//前往修改一家餐廳資訊的頁面
app.get('/restaurants/:id/edit', (req, res) => {})

// 修改一家餐廳的資訊
app.post('/restaurants/:id/edit', (req, res) => {})

// 刪除一家餐廳
app.post('/restaurants/:id/delete', (req, res) => {})

// render search results
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(
    restaurant =>
      // search by name
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      // search by category
      restaurant.category.includes(keyword)
  )
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`)
})
