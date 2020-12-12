import { ADD_TODO, REMOVE_TODO, LOAD_TODOS } from '../actionCreators'

const initialState = {
  todos: []
}

const todo = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TODOS:
      return { ...action.todos };
    case ADD_TODO:
      return {...state, todos: [...state.todos, action.todo]}
    case REMOVE_TODO:
      // ._id is a what mongo names it's ids 
      let todos = state.todos.filter(val => val._id !== action.id)
      return { ...state, todos }
    default:
      return state;
      
  }
}

export default todo;