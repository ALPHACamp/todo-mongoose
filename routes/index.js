const bcrypt = require('bcrypt-nodejs')
const todoController = require('../controllers/todoController.js')
const User = require('../models/user')

module.exports = (app, passport) => {
  const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('error_messages', 'You are not logged in')
    res.redirect('/signin')
  }

  // app.get('/', (req, res) => res.send('Hello World!'))
  app.get('/todos', authenticated, (req, res) => todoController.getTodos(req, res))
  app.get('/todos/:id', todoController.getTodos)
  app.post('/todos', todoController.postTodo)
  app.put('/todos/:id', todoController.putTodo)
  app.delete('/todos/:id', todoController.deleteTodo)
  app.patch('/todos/:id/check', todoController.patchTodoCheck)

  app.get('/signin', (req, res) => res.render('signin'))
  app.post('/signin',
    passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }),
    (req, res) => {
      req.flash('success_messages', 'You are logged')
      res.redirect('/todos')
    }
  )
  app.get('/signup', (req, res) => {
    req.flash('success_messages', 'You are registered now')
    return res.render('signup')
  })
  app.post('/signup', (req, res) => {
    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
    })
    user.save((err, user) => {
      if (err) return console.error(err)
      return res.redirect('/signin')
    })
  })
  app.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_messages', 'You are logged out')
    res.redirect('/signin')
  })
}
