import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

class Navbar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div className="app__nav">
        <Link to="/">Home</Link>
        {this.props.currentUser.isAuthenticated ? (
          <>
            <Link
              to={`/users/${this.props.currentUser.user.id}/todos/new`}
            >
              Add a todo
            </Link>
            <a onClick={this.logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Log In</Link>
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    currentUser: reduxState.currentUser
  }
}

export default connect(mapStateToProps, {logout})(Navbar);
