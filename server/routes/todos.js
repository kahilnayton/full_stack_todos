const express = require("express");
// mergeParams allows us to get access to the id inside this router
const router = express.Router({ mergeParams: true });

const {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo
} = require("../handlers/todos");

// prefix rout with todo
router.route("/").post(createTodo);

// update
router.route("/:todo_id/update").put(updateTodo);


router
  .route("/:todo_id")
  .get(getTodo)
  .delete(deleteTodo);

module.exports = router;
