const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

router.get('/:condition/:sortOrder', (req, res) => {
  const condition = req.params.condition
  const sortOrder = req.params.sortOrder
  // 依種類排序
  if (condition === 'category') {
    Restaurant.find({})
      .sort({ category: 1 })
      .exec((err, restaurants) =>
        err ? console.error(err) : res.render('index', { restaurants })
      )
    // 依地區排序
  } else if (condition === 'location') {
    Restaurant.find({})
      .sort({ location: 1 })
      .exec((err, restaurants) =>
        err ? console.error(err) : res.render('index', { restaurants })
      )
    // 依名稱排序(name, 非name_en)
  } else {
    Restaurant.find({})
      .sort({ name: sortOrder })
      .exec((err, restaurants) =>
        err ? console.error(err) : res.render('index', { restaurants })
      )
  }
})

module.exports = router
