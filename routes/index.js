const todoController = require('../controllers/todoController.js')

module.exports = function (app) {

  // app.get('/', (req, res) => res.send('Hello World!'))
  app.get('/todos', todoController.getTodos)
  app.get('/todos/:id', todoController.getTodos)
  app.post('/todos', todoController.postTodo)
  app.put('/todos/:id', todoController.putTodo)
  app.delete('/todos/:id', todoController.deleteTodo)
  app.patch('/todos/:id/check', todoController.patchTodoCheck)

};
