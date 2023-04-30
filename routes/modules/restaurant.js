const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 新增餐廳頁面
router.get("/new", (req, res) => {
  res.render("new")
})

// 瀏覽特定餐廳
router.get("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(err => console.log(err))
})

// 新增餐廳
router.post("/", (req, res) => {
  const info = req.body
  info.userId = req.user._id
  Restaurant.create(info)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// 編輯餐廳頁面
router.get("/:id/edit", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(err => console.log(err))
})

// 更新餐廳
router.put("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const info = req.body
  return Restaurant.findOneAndUpdate({ _id, userId }, info)
    //可依照專案發展方向自定編輯後的動作，這邊是導向到瀏覽特定餐廳頁面
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})

// 刪除餐廳
router.delete("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

module.exports = router