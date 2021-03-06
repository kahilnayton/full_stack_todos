const db = require("../models");

exports.createTodo = async function (req, res, next) {
  try {
    let todo = await db.Todo.create({
      task: req.body.task,
      user: req.params.id,
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.todos.push(todo.id);
    await foundUser.save();
    let foundTodo = await db.Todo.findById(todo._id).populate("user", {
      username: true,
    });
    return res.status(200).json(foundTodo);
  } catch (err) {
    return next(err);
  }
};

// GET /api/user/:id/todo
exports.getTodo = async function (req, res, next) {
  try {
    let todo = await db.Todo.find(req.params.todo_id);
    return res.status(200).json(todo);
  } catch (err) {
    return next(err);
  }
};

// UPDATE /api/user/:id/todo/:todo_id/update
exports.updateTodo = async function (req, res, next) {
  try {
    let updatedTodo = await db.Todo.findById(req.params.todo_id);
    await db.Todo.update(
      { _id: updatedTodo },
      {
        $set: {
          done: true,
        }
      }
   );
    return res.status(200).json(updatedTodo);
  } catch (err) {
    return next(err);
  }
};


// DELETE  /api/users/:id/todos/:todo_id
exports.deleteTodo = async function (req, res, next) {
  try {
    let foundTodo = await db.Todo.findById(req.params.todo_id);
    await foundTodo.remove();

    return res.status(200).json(foundTodo);
  } catch (err) {
    return next(err);
  }
};
