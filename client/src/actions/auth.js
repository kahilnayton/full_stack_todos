import { apiCall, setTokenHeader } from "../services/api";
import { SET_CURRENT_USER } from "../actionCreators";
import {addError, removeError } from './errors'

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token)
}

export function logout() {
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false)
    dispatch(setCurrentUser({}))
  }
}

export function authUser(type, userData) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // destructuring the result
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          // so then we can just type in token
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token)
          dispatch(setCurrentUser(user));
          dispatch(removeError())
          resolve(); // Indicates is was successful
        })
        .catch(err => { 
          // pass the message to our error action
        dispatch(addError(err.message))
        reject();
      })
    });
  };
}
