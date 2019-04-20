const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

router.get('/:condition/:sortOrder', (req, res) => {
  const condition = req.params.condition
  const sortOrder = req.params.sortOrder
  console.log(typeof sortOrder)
  console.log(typeof condition)
  // switch (sortOrder){
  //   case''

  // }

  Restaurant.find({})
    .sort({ condition: sortOrder })
    .exec((err, restaurants) =>
      err ? console.error(err) : res.render('index', { restaurants })
    )
})

module.exports = router
