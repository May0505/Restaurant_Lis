const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { lists: restaurantList.results })
})

app.get('/restaurants/:restaurantList_id', (req, res) => {
  const restaurant = restaurantList.results.filter(restaurant => restaurant.id === Number(req.params.restaurantList_id))
  res.render('show', { restaurant: restaurant[0]})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.results.filter((restaurant) => {
  return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword) 
})
  res.render('index', { lists: restaurants, keyword:req.query.keyword})
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`listening on localhost:${port}`)
})