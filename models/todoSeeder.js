const mongoose = require('mongoose')
const Todo = require('./todo')

const mongoURI = 'mongodb://127.0.0.1/todo-mongoose'
mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log(`Connected to MongoDB`)

  for (let i = 0; i < 5; i++) {
    console.log(`generate name-${i} data`)
    Todo.create({ name: `name-${i}` })
  }
  console.log('done')
})
