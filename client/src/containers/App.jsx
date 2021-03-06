import React, { Component } from "react";
import { connect } from "react-redux";
import { AiFillGithub, AiOutlineLinkedin } from "react-icons/ai";
import { Switch, Route, withRouter } from "react-router-dom";
import "../App.scss";
import AuthForm from "../AuthForm";
// import TodoItem from "../components/TodoItem";
import Homepage from "../components/Homepage";
import Navbar from "./Navbar";
import TodoForm from "./TodoForm";
// import { getTodos, addTodo, removeTodo } from "../actionCreators";
import { removeError } from "../store/actions/errors";
import { authUser } from "../store/actions/auth";
import withAuth from "../hocs/withAuth";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { authUser, errors, removeError, currentUser } = this.props;

    return (
      <div className="app">
        <Navbar currentUser={currentUser} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Homepage currentUser={currentUser} {...props} />
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
          <Route path="/users/:id/todos/new" component={withAuth(TodoForm)} />
        </Switch>

        <footer className="app__footer">
          <a
            target="_blank"
            href="https://github.com/kahilnayton/full_stack_todos"
          >
            <AiFillGithub />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/kahilnayton/">
            <AiOutlineLinkedin />
          </a>
        </footer>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    currentUser: reduxState.currentUser,
    errors: reduxState.errors,
  };
}

export default withRouter(
  connect(mapStateToProps, {
    authUser,
    removeError,
  })(App)
);
