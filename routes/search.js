const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// render search results
router.get('/', (req, res) => {
  const keyword = RegExp(req.query.keyword, 'i')
  console.log(req.query)
  Restaurant.find(
    // $or可以查詢name或category等於keyword 的文檔
    { $or: [{ name: keyword }, { category: keyword }] }
  )
    .sort({ name: 'desc' })
    .exec((err, restaurants) =>
      err
        ? console.error(err)
        : res.render('index', { restaurants, keyword: req.query.keyword })
    )
})
module.exports = router
