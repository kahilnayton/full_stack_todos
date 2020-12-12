require("dotenv").config();
const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const todoRoutes = require('./routes/todos')
const authRoutes = require('./routes/auth')
const db = require('./models')
const PORT = 3001

const errorHandler = require('./handlers/error.')


app.use(morgan("tiny"))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use(
  '/api/users/:id/message',
  loginRequired,
  ensureCorrectUser,
  todosRoutes
);


// any routes that comes in we're going to pre fix them with this route
app.use('/api/todos', loginRequired, async function (req, res, next) {
  try {
    let todos = await db.Todos.find()
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