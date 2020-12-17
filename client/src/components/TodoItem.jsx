import React from "react";
import Moment from "react-moment";

const TodoItem = ({
  date,
  userId,
  todoId,
  username,
  isCorrectUser,
  updateTodo,
  task,
  removeTodo,
}) => {
  return (
    <div className="app__todo-container">
      <button className="app__done-button" onClick={updateTodo}>
        <span className="app__done-tick"></span>
      </button>
      <span className="app__todo-item">
        <h1 className="app__todo-task">
        {task}
      </h1>
        <Moment className="app__todo-date" format="Do MMM YYYY">
          {date}
        </Moment>
      </span>
      <button className="app__delete-button" onClick={removeTodo}>
        <span className="app__delete-cross"></span>
      </button>
    </div>
  );
};

export default TodoItem;
