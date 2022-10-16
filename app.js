// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const methodOverride = require("method-override")
const Restaurant = require("./models/restaurant")
const routes = require('./routes')

require('./config/mongoose')


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})