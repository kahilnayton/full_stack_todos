import { SET_CURRENT_USER } from '../actionTypes'

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        // Turn an empty object into false or if there are keys switch to true
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      }
    default:
      return state;
  }
}