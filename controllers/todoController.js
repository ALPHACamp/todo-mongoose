const Todo = require('../models/todo')

let todoController = {
  getTodos: (req, res) => {
    Todo.find((err, todos) => {
      if (err) return console.error(err)
      return res.render('todos', {todos: todos})
    })
  },
  getTodo: (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
      if (err) return console.error(err)
      return res.render('todo', {todo: todo})
    })
  },
  getNew: (req, res) => {
    return res.render('new')
  },
  getEdit: (req, res) => {
    Todo.findById(req.params.id, (err, doc) => {
      if (err) return console.error(err)
      todo = {
        id: doc.id,
        name: doc.name,
        done: doc.done,
      }
      return res.render('edit', {todo: todo})
    })
  },
  postTodo: (req, res) => {
    const todo = Todo({
      name: req.body.name
    })

    todo.save((err) => {
      if (err) return console.error(err)
      return res.redirect('/todos')
    })
  },
  putTodo: (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
      if (err) return console.error(err)
      todo.name = req.body.name,
      todo.done = req.body.done === 'on'
      todo.save((err) => {
        if (err) return console.error(err)
        return res.redirect(`/todos/${req.params.id}`)
      })
    })
  },
  deleteTodo: (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
      if (err) return console.error(err)
      todo.remove((err) => {
        if (err) return console.error(err)
        return res.redirect(`/todos`)
      })
    })
  }
}
module.exports = todoController
