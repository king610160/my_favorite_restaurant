const db = require('../../config/mongoose')
const restaurant = require("../restaurant")
const restaurantList = require("../../restaurant.json").results

db.once("open", () => {
  console.log("running restaurantSeeder script...")

  restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!")
      db.close()
    })
    .catch(err => console.log(err))
})
