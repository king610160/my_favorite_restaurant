const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get("/", (req, res) => {
  const userId = req.user._id   // 變數設定
  Restaurant.find({ userId })   // 加入查詢條件
    .lean()
    .sort({ _id: 'asc' }) 
    .then(restaurant => res.render("index", { restaurant }))
    .catch(err => console.log(err))
})

// 搜尋特定餐廳
router.get("/search", (req, res, next) => {
  if (!req.query.keywords) {
    res.redirect("/")
    return next()
  }

  const keyword = req.query.keywords.trim().toLowerCase()
  const userId = req.user._id   // 當時使用者id

  Restaurant.find( {userId} )
    .lean()
    .sort({ _id: 'asc' }) //desc
    .then(restaurant => {
      const filterRestaurant = restaurant.filter(
        data => data.name.toLowerCase().includes(keyword) || data.category.includes(keyword)
      )
      res.render("index", { restaurant: filterRestaurant, keyword })
    })
    .catch(err => console.log(err))
})

module.exports = router