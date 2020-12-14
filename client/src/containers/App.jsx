import React, { Component } from "react";
import { connect } from "react-redux";
import { AiFillGithub, AiOutlineLinkedin } from "react-icons/ai";
import { Switch, Link, Route, withRouter } from "react-router-dom";
import "../App.scss";
import AuthForm from "../AuthForm";
import TodoItem from "../components/TodoItem";
import Homepage from "../components/Homepage";
import Navbar from "./Navbar";
import TodoForm from "./TodoForm";
import { getTodos, addTodo, removeTodo } from "../actionCreators";
import { removeError } from "../store/actions/errors";
import { authUser } from "../store/actions/auth";
import withAuth from "../hocs/withAuth";

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
  };

  render() {
    const { authUser, errors, removeError, currentUser, todos } = this.props;

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
        </Switch>
        <Route path="/users/:id/todos/new" component={withAuth(TodoForm)} />
        <Route exact path="/todos" component={() => <div>{todos}</div>} />
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
    addTodo,
    removeTodo,
    getTodos,
    removeError,
  })(App)
);
