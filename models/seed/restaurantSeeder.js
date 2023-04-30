const bcrypt = require('bcryptjs')
if (process.env.PROCESS_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Restaurant = require("../restaurant")
const restaurantList = require("./restaurant.json").results
const Member = require('../users')
const memberData = require('./users.json')

db.once("open", () => {
  console.log("running restaurantSeeder script...")
  const promises = memberData.map(USER => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(USER.password, salt))
      .then(hash => Member.create({
        name: USER.name,
        email: USER.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        const name = user.name
        let restaurant = []
        if (name === memberData[0].name) {
          restaurant = restaurantList.slice(0, 3)
        } else {
          restaurant = restaurantList.slice(3, 6)
        }
        return Restaurant.create(
          restaurant.map(r => Object.assign(r, { userId }))
        )
      })
      .catch(err => console.log(err))
  })

  Promise.all(promises)
    .then(() => {
      console.log('restaurantSeeder done!')
      process.exit()
    })
    .catch(err => console.log(err))
})