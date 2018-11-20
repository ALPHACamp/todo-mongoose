const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 3000

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
    return res.send(JSON.stringify(todos))
  })
})

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
)
