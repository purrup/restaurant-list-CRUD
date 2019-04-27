const express = require('express')
const app = express()
// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  // 如果不是 production 模式
  require('dotenv').config() // 使用 dotenv 讀取 .env 檔案
}
const exphbs = require('express-handlebars')
const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
// 連線MongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurants', {
  useNewUrlParser: true,
  useCreateIndex: true,
})
const db = mongoose.connection

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// 設定 method-override
app.use(methodOverride('_method'))

// 使用 express session
app.use(
  session({
    secret: 'purrup',
    resave: 'false',
    saveUninitialized: 'false',
  })
)

// 使用 Passport
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

// 設定handlebars和模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// routers
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))
app.use('/search', require('./routes/search'))
app.use('/sort', require('./routes/sort'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))

app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`)
})
