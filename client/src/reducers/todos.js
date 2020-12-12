import { ADD_TODO, REMOVE_TODO, GET_TODOS } from '../actionCreators'

const initialState = {
  todos: []
}

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return { ...state, todos: action.data };
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