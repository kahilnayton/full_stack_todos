require("dotenv").config(); // loads all our env variables
const express = require("express")
const app = express()
const cors = require("cors")
// const morgan = require('morgan')
const bodyParser = require('body-parser')
const todosRoutes = require('./routes/todos')
const authRoutes = require('./routes/auth')
const db = require('./models')
const PORT = 3001
const {loginRequired, ensureCorrectUser} = require('./middleware/auth')
const errorHandler = require('./handlers/error')


app.use(cors())
app.use(bodyParser.json())

// all my routes

app.use('/api/auth', authRoutes)
app.use(
  '/api/users/:id/todos',
  loginRequired,
  ensureCorrectUser,
  todosRoutes
);


// any routes that comes in we're going to pre fix them with this route
app.use('/api/todos', loginRequired, async function (req, res, next) {
  try {
    let todos = await db.Todo.find({})
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      })
    return res.status(200).json(todos);
  } catch (err) {
    return next (err)
  }
})

app.use(function (req, res, next) {
  let err = new Error('not found')
  err.status = 404
  next(err)
})

app.use(errorHandler)

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.send({
    message: err.message,
    error: err
  })
})

app.listen(PORT, function () {
  console.log(`server starting on ${PORT}`)
})