const db = require('../models');
const jwt = require('jsonwebtoken')

exports.signin = async function (req, res, next) {
  // Find a user

  try {
    let user = await db.User.findOne({
      email: req.body.email
    })
    let { id, username, profileImageUrl } = user
    let isMatch = await user.comparePassword(req.body.password)
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          username,
          profileImageUrl
        },
        process.env.SECRET_KEY
      )
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      })
    } else {
      return next({
        status: 400,
        message: "That is an invalid user name or password mate"
      })
    }
  } catch (e) {
    return next({status: 400, message: "Invalid email or username"})
  }
}

exports.signup = async function (req, res, next) {
  try {
    let user = await db.User.create(req.body)
    let { id, username, profileImageUrl } = user;
    let token = jwt.sign(
      {
        id,
        username,
        profileImageUrl
      },
      process.env.SECRET_KEY
    )
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    })
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, believe it or not that user name or email has already been taken"
    }
    return next({
      status: 400,
      message: err.message
    })
  }
}