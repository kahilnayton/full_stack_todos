import React, { Component } from "react";

class Authform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageUrl: "",
    };
  }

  render() {
    const { email, username, password, profileImageUrl } = this.state;
    const { heading, buttonText } = this.props;
    return (
      <div className="auth-form">
        <form action="" onSubmit={this.handleSubmit}>
          <h2 className="heading">{heading}</h2>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={this.handleChange}
            value={email}
            className="auth-form__control"
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={this.handleChange}
            className="auth-form__control"
          />
        </form>
      </div>
    );
  }
}

export default Authform;
