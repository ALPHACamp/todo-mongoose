const mongoose = require('mongoose')
const Todo = require('./todo')

const mongoURI = 'mongodb://127.0.0.1/todo-mongoose'
mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log(`Connected to MongoDB`)
  for (const x of Array(5).keys()) {
    console.log(`generate name-${x} data`)
    Todo.create({ name: `name-${x}` });
  }
  console.log(`done`)
})
