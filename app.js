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
  return res.render('new')
})

app.get('/todos/:id/edit', (req, res) => {
  Todo.findById(req.params.id, (err, doc) => {
    if (err) return console.error(err)
    todo = {
      id: doc.id,
      name: doc.name,
      done: doc.done,
    }
    return res.render('edit', {todo: todo})
  })
})

app.get('/todos/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    return res.render('todo', {todo: todo})
  })
})

app.post('/todos', (req, res) => {
 const todo = Todo({
    name: req.body.name,
  })

  todo.save((err) =>{
    if (err) return console.error(err)
    return res.redirect('/todos')
  })
})

app.post('/todos/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    todo.name = req.body.name,
    todo.done = req.body.done === 'on' ? true : false
    todo.save((err) =>{
    if (err) return console.error(err)
      return res.redirect(`/todos/${req.params.id}`)
    })
  })
})

app.delete('/todos/:id', (req, res) => {
  return res.send('delete /todos/:id')
})

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
)
