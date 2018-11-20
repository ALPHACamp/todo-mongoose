const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')
const Todo = require('../models/todo')

chai.use(chaiHttp)

describe('Todo model', () => {
  it('should be invalid if name is empty', (done) => {
    const todo = new Todo()

    todo.validate((err) => {
      expect(err.errors.name).to.exist
      done()
    })
  })
})

describe('/GET todos and abc', () => {
 it('it should GET todos return 200', (done) => {
    chai.request('http://localhost:3000')
      .get('/todos')
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })
 it('it should GET abc return 404', (done) => {
    chai.request('http://localhost:3000')
      .get('/abc')
      .end((err, res) => {
        expect(res).to.have.status(404)
        done()
      })
  })
})

describe('/POST todos', () => {
 it('it should POST todos return 200', (done) => {
    chai.request('http://localhost:3000')
      .post('/todos')
      .type('form')
      .send({name: 'test'})
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })
})