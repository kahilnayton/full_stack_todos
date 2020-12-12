import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Link, Route, withRouter } from "react-router-dom";
import "./App.scss";
import AuthForm from "./AuthForm";
import TodoItem from "./TodoItem";
import Homepage from "./Homepage";
import TodoForm from "./TodoForm";
import { getTodos, addTodo, removeTodo } from "./actionCreators";
import { removeError } from "./actions/errors";
import { authUser } from "./actions/auth";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // there is no need to make this asynchronous because that will ne handled by redux thunk
    this.props.getTodos();
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
              path="/todos"
              render={(props) => (
                <Homepage
                  currentUser={currentUser}
                  todos={todos}
                  removeTodo={this.removeTodo}
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

        <div className="app__inner">
          <div className="app__heading">
            <h1 className="heading">Welcome to a todo list</h1>
          </div>
          <Route path="/todos" />
          <div className="app__button-container">
            <Link className="button" to="/todos">
              See my todos
            </Link>
            <Link className="button" to="/todos/new">
              Add a todo
            </Link>
          </div>
        </div>
        <div>
          <Route
            path="/todos/new"
            component={(props) => (
              <TodoForm {...props} handleSubmit={this.handleSubmit} />
            )}
          />
          <Route exact path="/todos" component={() => <div>{todos}</div>} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    todos: reduxState.todos,
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
