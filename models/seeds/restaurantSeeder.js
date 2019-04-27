const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const userList = require('../../user.json')
const User = require('../user')
const bcrypt = require('bcryptjs')
const users = userList.results

mongoose.connect('mongodb://localhost/restaurants', {
  useNewUrlParser: true,
  useCreateIndex: true,
})
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')
  for (let i = 0; i < users.length; i++) {
    const user = User(users[i])
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        user.save()
      })
    })
    // 一個使用者分配三間餐廳
    for (let j = i * 3; j < i * 3 + 3; j++) {
      // i = 0, j = 0, j< 3
      // i = 0, j = 1, j < 3
      // i = 0, j = 2, j < 3
      // i = 1, j = 3, j < 6
      // i = 1, j = 4, j < 6
      // i = 1, j = 5, j < 6
      Restaurant.create({ ...restaurantList[j], userId: user._id })
    }
  }

  console.log('done!')
})
