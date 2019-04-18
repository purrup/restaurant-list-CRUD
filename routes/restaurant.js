const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// 前往新增一家餐廳資訊的頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增一家餐廳
router.post('/add', (req, res) => {
  const restaurant = Restaurant(req.body)
  // 如果圖片區空白，插入隨機圖片
  !restaurant.image
    ? (restaurant.image = 'https://picsum.photos/291/180/?random')
    : true
  restaurant.save(err => (err ? console.error(err) : res.redirect('/')))
})

// 瀏覽一家餐廳的詳細資訊
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { restaurant })
  })
})

//前往修改一家餐廳資訊的頁面
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant })
  })
})

// 修改一家餐廳的資訊
router.put('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    Object.assign(restaurant, req.body)

    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${restaurant.id}`)
    })
  })
})

// 刪除一家餐廳
router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router
