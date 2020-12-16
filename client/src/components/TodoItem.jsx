import React from 'react'
import Moment from 'react-moment'

const TodoItem = ({ date, userId, todoId, username, isCorrectUser, task, removeTodo }) => {
  
  return (
    <div className="app__todo-container">
      <span className="app__todo-item">
        {task}
      </span>
      <span className="app__todo-date">
        <Moment className="date" format="Do MMM YYYY">
          {date}
        </Moment>
      </span>
      <button className="app__delete-button" onClick={removeTodo}>
        <span className="app__delete-cross"></span>
      </button>
    </div>
  )
}

export default TodoItem
