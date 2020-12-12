import React, { Component } from "react";
import { Link } from "react-router-dom";

const Homepage = ({currentUser }) => {
    if (!currentUser.isAuthenticated) {
      return (
        <div>
          <h1>You need to log in</h1>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      );
    }
    return (
      <div>
        <h1>You made it</h1>
        <Link className="button" to="/users/">
          Add a todo
        </Link>
        <div className="app__inner">
          <div className="app__heading">
            <h1 className="heading">Welcome to a todo list</h1>
          </div>
          <Route path="/todos" />
          <div className="app__button-container">
            <Link className="button" to="/todos">
              See my todos
            </Link>
           
          </div>
        </div>
      </div>
    );
  }

export default Homepage;