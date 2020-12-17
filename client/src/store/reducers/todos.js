import { REMOVE_TODO, LOAD_TODOS, UPDATE_TODO } from '../actionTypes'

const todo = (state = [], action) => {
  // debugger;
  switch (action.type) {
    case LOAD_TODOS:
      return [...action.todos];
    case REMOVE_TODO:
      // ._id is a what mongo names it's ids 
      return state.filter(todo => todo._id !== action.id);
    case UPDATE_TODO:
      return [...action.todos];
    default:
      return state;
  }
}


export default todo;