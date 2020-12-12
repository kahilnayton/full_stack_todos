const mongoose = require("mongoose");
mongoose.set("debug", true);
// Set Mongoose to set es6 Promises
mongoose.Promise = "Promise";
mongoose.connect("mongodb://localhost/server", {
  keepAlive: true,
});

module.exports.User = require("./user");
module.exports.Todo = require("./todo");
