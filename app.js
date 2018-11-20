const mongoose = require('mongoose')
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser= require('body-parser')
const app = express()
const port = 3000

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended: true}))

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

app.get('/todos', (req, res) => {
  Todo.find((err, todos) => {
    if (err) return console.error(err)
    return res.render('todos', {todos: todos})
  })
})

app.get('/todos/new', (req, res) => {
  return res.send('get /todos/new')
})

app.get('/todos/edit', (req, res) => {
  return res.send('get /todos/edit')
})

app.get('/todos/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    return res.render('todo', {todo: todo})
  })
})

app.post('/todos', (req, res) => {
  return res.send('post /todos')
})

app.put('/todos/:id', (req, res) => {
  return res.send('put /todos/:id')
})

app.delete('/todos/:id', (req, res) => {
  return res.send('delete /todos/:id')
})

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
)
