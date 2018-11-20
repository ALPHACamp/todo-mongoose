const mongoose = require('mongoose')
const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

const mongoURI = 'mongodb://127.0.0.1/todo-mongoose'
mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => console.log(`Connected to MongoDB`))

const Todo = require('./models/todo')

app.get('/', (req, res) => {
  Todo.find((err, todos) => {
    if (err) return console.error(err)
    return res.render('index', {todos: todos})
  })
})

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
)
