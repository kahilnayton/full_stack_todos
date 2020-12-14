import { REMOVE_TODO, LOAD_TODOS } from '../actionTypes'

const initialState = {
  todos: []
}

const todo = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TODOS:
      return { ...action.todos };
    case REMOVE_TODO:
      // ._id is a what mongo names it's ids 
      let todos = state.todos.filter(val => val._id !== action.id)
      return { ...state, todos }
    default:
      return state;
      
  }
}

export default todo;