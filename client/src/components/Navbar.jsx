import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="app__nav">
        <Link to="/">Home</Link>
        {this.props.currentUser.isAuthenticated ? (
          <div>
            <Link
              to={`/users/${this.props.currentUser.user.id}/todos/new`}
            >
              Add a todo
            </Link>
            <a onClick={this.logout}>Logout</a>
          </div>
        ) : (
          <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Log In</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;
