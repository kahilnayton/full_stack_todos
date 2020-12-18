import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_TODOS, REMOVE_TODO, UPDATE_TODO } from "../actionTypes";
import { history } from '../../index';


export const loadTodos = (todos) => ({
  type: LOAD_TODOS,
  todos,
});

export const remove = (id) => ({
  type: REMOVE_TODO,
  id,
});

export const update = (id) => ({
  type: UPDATE_TODO,
  id,
});

export const removeTodo = (user_id, todo_id) => {
  return (dispatch) => {
    return apiCall("delete", `/api/users/${user_id}/todos/${todo_id}`)
      .then(() => dispatch(remove(todo_id)))
      .then(history.push('/'))
      .catch((err) => {
        addError(err.message);
      });
  };
};

export const updateTodo = (user_id, todo_id) => {
  // debugger;
  return (dispatch) => {
    return apiCall("put", `/api/users/${user_id}/todos/${todo_id}/update`)
      .then(() => dispatch(update(todo_id)))
      .catch((err) => {
        addError(err.message);
      });
  };
};

// The functions that we're actually going to use will use redux thunk
// Action creators usually return objects, but we're returning a function that returns an asynchronous action
export const fetchTodos = () => {
  return (dispatch) => {
    return apiCall("get", "/api/todos")
      .then((res) => dispatch(loadTodos(res)))
      .catch((err) => dispatch(addError(err.message)));
  };
};

// Wait until our ajax call has finished then go to the reducer with the todo that our call got back from the server then map state to props
export const addTodo = (task) => (dispatch, getState) => {
  // debugger;
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/todos`, { task })
    .then((res) => {})
    .catch((err) => addError(err.message));
};
