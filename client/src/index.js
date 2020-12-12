import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import jwtDecode from 'jwt-decode'
// applyMiddleware helps us to use thunk
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// Thunk allows us to create action creators that return a function instead of an action
// In this case it delays dispatch so that we can wait until some asynchronous action has completed
import thunk from "redux-thunk";
import reportWebVitals from "./reportWebVitals";
import { setAuthorizationToken, setCurrentUser } from "./actions/auth";

// pass the middleware as a parameter to createStore
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);

// This is building hydration - so that in the event that anything crashes we will be able to re hydrate out state with all the user data
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  // Failsafe incase someone tries to tamper with the token in local storage
  try {
    // taking just the pay load of the token with jwtDecode
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
  } catch (e) {
    store.dispatch(setCurrentUser({}))
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
