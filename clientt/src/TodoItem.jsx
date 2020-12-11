import React from 'react'

const TodoItem = ({task, removeTodo}) => {
  return (
    <div className="app__todo-container">
      <span className="app__todo-item">
      {task}
      </span>
      <button className="app__delete-button" onClick={removeTodo}>
        <span className="app__delete-cross"></span>
      </button>
    </div>
  )
}

export default TodoItem
