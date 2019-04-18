const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// 瀏覽全部餐廳
router.get('/', (req, res) => {
  Restaurant.find({})
    .sort({ name: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants })
    })
})

module.exports = router
