import "./App.scss";
import TodoList from "./TodoList";
import AuthForm from "./AuthForm";
import { Switch, Link, Route } from "react-router-dom";
import { authUser } from "./auth";
import { connect } from 'react-redux'

const App = props => {
  const { authUser, errors, removeErrors, currentUser } = props;
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
            path="/signin"
            render={(props) => {
              return (
                <AuthForm
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
        <Route path="/todos" component={TodoList} />
        <div className="app__button-container">
          <Link className="button" to="/todos">
            See my todos
          </Link>
          <Link className="button" to="/todos/new">
            Add a todo
          </Link>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(reduxState) {
  return {
    todos: reduxState.todos
  }
}

export default connect(mapStateToProps, {authUser })(App);
