const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/server')
mongoose.set('debug', true)
// use the built in Ee6 promises
mongoose.Promise = Promise;

// build a simple schema where all our todos will just have a task
const todoSchema = new mongoose.Schema({
  task: String
})

// make a modal and then export it out
const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;