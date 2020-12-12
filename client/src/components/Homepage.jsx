import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

const Homepage = ({ currentUser }) => {
  if (!currentUser.isAuthenticated) {
    return (
      <div className="app">
        <div className="app__heading">
          <h1>You need to signin or signup</h1>
        </div>
        <div className="app__button-container">
          <Link className="button" to="/signin">
            Sign In
          </Link>
          <Link className="button" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="app__inner">
        <div className="app__heading">
          <h1 className="heading">Welcome {currentUser.user.username}</h1>
        </div>
        <Route path="/todos" />
        <div className="app__button-container">
          <Link className="button" to="/todos">
            See my todos
          </Link>
          <Link className="button" to={`/users/${currentUser.user.id}/todos/new`}>
            Add a todo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
