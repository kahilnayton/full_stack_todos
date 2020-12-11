const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const todoRoutes = require('./routes/todos')

app.use(morgan("tiny"))
app.use(bodyParser.json())
app.use(cors())
// any routes that comes in we're going to pre fix them with this route
app.use('/api/todos', todoRoutes)

app.use(function (req, res, next) {
  let err = new Error('not found')
  err.status = 404
  next(err)
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.send({
    message: err.message,
    error: err
  })
})

app.listen(3001, function () {
  console.log("server starting on 3001")
})