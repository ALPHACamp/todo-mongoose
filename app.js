const mongoose = require('mongoose')
const express = require('express')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser= require('body-parser')
const app = express()
const port = 3000

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'))

const db = require('./models')
const Todo = require('./models/todo')

app.listen(port, () => {
  db.once('open', () => console.log(`Connected to MongoDB`))
  console.log(`Example app listening on port ${port}!`)
})

require('./routes')(app)