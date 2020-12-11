# full_stack_todos
- Stack -
React.js
Redux
Mongo DB
Express
Sass


### Sneak peak 
``` jsx
export function addTodo(task) {
  return dispatch => {
    return fetch("http://localhost:3001/api/todos", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({task})
    })
      .then(res => res.json())
      .then(data => dispatch(handleAdd(data)))
      .catch(err => console.error("something went wrong in addTodos", err))
  }
}

export function removeTodo(id) {
  return dispatch => {
    return fetch(`http://localhost:3001/api/todos/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => dispatch(handleRemove(id)))
      .catch(err => console.error("something went wrong in removeTodos", err))
  }
}

```