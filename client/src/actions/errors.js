import { ADD_ERROR, REMOVE_ERROR } from '../actionCreators'

// It's important to have the parenthesis around the curly bracket so that we return an object
export const addError = error => ({
  type: ADD_ERROR,
  error
})

export const removeError = () => ({
  type: REMOVE_ERROR
})