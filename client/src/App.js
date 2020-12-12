import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Link, Route, withRouter } from "react-router-dom";
import "./App.scss";
import AuthForm from "./AuthForm";
import TodoItem from "./components/TodoItem";
import Homepage from "./components/Homepage";
import TodoForm from "./containers/TodoForm";
import { getTodos, addTodo, removeTodo } from "./actionCreators";
import { removeError } from "./actions/errors";
import { authUser } from "./actions/auth";
import withAuth from './hocs/withAuth'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(val) {
    this.props.addTodo(val);
  }
  removeTodo = (id) => {
    this.props.removeTodo(id);
  }

  render() {
    const { authUser, errors, removeError, currentUser, todos } = this.props;

    return (
      <div className="app">
        <div className="app__nav">
          <Link to="/">Home</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Log In</Link>
        </div>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Homepage
                  currentUser={currentUser}
                {...props} />
              )}
            />
            <Route
              exact
              path="/signin"
              render={(props) => {
                return (
                  <AuthForm
                    removeError={removeError}
                    errors={errors}
                    onAuth={authUser}
                    buttonText="Log in"
                    heading="Welcome Back"
                    {...props}
                  />
                );
              }}
            />
            <Route
              exact
              path="/signup"
              render={(props) => {
                return (
                  <AuthForm
                    removeError={removeError}
                    errors={errors}
                    onAuth={authUser}
                    buttonText="Register"
                    heading="Create an account"
                    signUp={true}
                    {...props}
                  />
                );
              }}
            />
          </Switch>
        </div>

        <div>
          <Route
            path="/users/:id/todos/new"
            component={withAuth(TodoForm)}
          />
          <Route exact path="/todos" component={() => <div>{todos}</div>} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    currentUser: reduxState.currentUser,
    errors: reduxState.errors
  };
}

export default withRouter(
  connect(mapStateToProps, {
    authUser,
    addTodo,
    removeTodo,
    getTodos,
    removeError,
  })(App)
);
