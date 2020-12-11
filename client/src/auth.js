import { apiCall } from "./services/api";
import { SET_CURRENT_USER } from "./actionCreators";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function authUser(type, userData) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // destructuring the result
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          // so then we can just type in token
          localStorage.setItem("jwtToken", token);
          dispatch(setCurrentUser(user));
          resolve();
        })
      .catch (err => { 
        reject();
      })
    });
  };
}
