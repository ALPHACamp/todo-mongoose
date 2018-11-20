const todoController = require('../controllers/todoController.js')
const User = require('../models/user')

module.exports = function (app, passport) {

  function authenticated (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
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
    function(req, res) {
      res.redirect('/todos')
    }
  )
  app.get('/signup', (req, res) => {
    return res.render('signup')
  })
  app.post('/signup', (req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    })
    user.save((err, user) =>{ 
      if (err) return console.error(err)
      return res.redirect('/signin')
    })
  })
  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/signin')
  })
};
