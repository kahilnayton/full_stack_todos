import { REMOVE_TODO, LOAD_TODOS } from '../actionTypes'

const todo = (state = [], action) => {
  switch (action.type) {
    case LOAD_TODOS:
      return { ...action.todos };
    case REMOVE_TODO:
      // ._id is a what mongo names it's ids 
      return state.filter(todo => todo._id !== action.id);
    default:
      return state;
  }
}


export default todo;