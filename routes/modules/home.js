const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get("/", (req, res) => {
  Restaurant.find({})
    .lean()
    .sort({ _id: 'asc' }) //desc
    .then(restaurant => res.render("index", { restaurant }))
    .catch(err => console.log(err))
})

// 搜尋特定餐廳
router.get("/search", (req, res) => {
  if (!req.query.keywords) {
    res.redirect("/")
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' }) //desc
    .then(restaurant => {
      const filterRestaurant = restaurant.filter(
        data => data.name.toLowerCase().includes(keyword) || data.category.includes(keyword)
      )
      res.render("index", { restaurant: filterRestaurant, keywords })
    })
    .catch(err => console.log(err))
})

module.exports = router