export const ADD_TODO = "ADD_TODO";
export const LOAD_TODOS = "GET_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const ADD_ERROR = "ADD_ERROR";
export const REMOVE_ERROR = "REMOVE_ERROR";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

function handleTodos(data) {
  return {
    type: LOAD_TODOS,
    data,
  };
}
function handleAdd(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}

function handleRemove(id) {
  return {
    type: REMOVE_TODO,
    id,
  };
}

// The functions that we're actually going to use will use redux thunk
// Action creators usually return objects, but we're returning a function that returns an asynchronous action
export function getTodos() {
  return (dispatch) => {
    return fetch("http://localhost:3001/api/todos")
      .then((res) => res.json())
      .then((data) => dispatch(handleTodos(data)))
      .catch((err) => console.error("something went wrong in getTodos", err));
  };
}
// Wait until our ajax call has finished then go to the reducer with the todo that our call got back from the server then map state to props
export function addTodo(task) {
  return (dispatch) => {
    return fetch("http://localhost:3001/api/todos", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ task }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(handleAdd(data)))
      .catch((err) => console.error("something went wrong in addTodos", err));
  };
}

export function removeTodo(id) {
  return (dispatch) => {
    return fetch(`http://localhost:3001/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => dispatch(handleRemove(id)))
      .catch((err) =>
        console.error("something went wrong in removeTodos", err)
      );
  };
}
