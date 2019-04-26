const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth')
// 瀏覽全部餐廳
router.get('/', authenticated, (req, res) => {
  Restaurant.find({})
    .sort({ name: 'asc' })
    .exec((err, restaurants) =>
      err ? console.error(err) : res.render('index', { restaurants })
    )
})

module.exports = router
