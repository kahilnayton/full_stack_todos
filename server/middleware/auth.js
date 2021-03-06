require("dotenv").config();
var jwt = require("jsonwebtoken");

// A user must be both authenticated and authorized to make actions

exports.loginRequired = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (decoded) {
        return next();
      } else {
        return next({ status: 401, message: "You gotta log in first" });
      }
    });
  } catch (e) {
    return next({ status: 401, message: "Please Log in" });
  }
};

exports.ensureCorrectUser = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({ status: 401, message: "You are unauthorized" });
      }
    });
  } catch (e) {
    return next({
      status: 401,
      message: "You are no allowed in untill you log in",
    });
  }
};
