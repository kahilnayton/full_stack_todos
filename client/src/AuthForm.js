import React, { Component } from "react";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageUrl: "",
    };
  }

  // Using es6 computed property name
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    // prevent the page from refreshing
    e.preventDefault();
    // This is useful to tell us the type of request we're going to make
    const authType = this.props.signUp ? "signup" : "signin";
    this.props.onAuth(authType, this.state).then(() => {
      console.log("logged in");
    });
  };

  render() {
    const { email, username, password, profileImageUrl } = this.state;
    const { heading, buttonText, signUp } = this.props;
    return (
      <div className="auth-form">
        <h2 className="auth-form__heading">{heading}</h2>
        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="email"></label>
          <input
            type="text"
            placeholder="EMAIL"
            id="email"
            name="email"
            onChange={this.handleChange}
            value={email}
            className="auth-form__control"
          />
          <label htmlFor="password"></label>
          <input
            id="password"
            name="password"
            placeholder="PASSWORD"
            type="password"
            onChange={this.handleChange}
            className="auth-form__control"
          />
          {signUp && (
            <>
              <label htmlFor="username"></label>
              <input
                type="text"
                placeholder="USERNAME"
                id="username"
                name="username"
                onChange={this.handleChange}
                value={username}
                className="auth-form__control"
              />
              <label htmlFor="image-url"></label>
              <input
                className="auth-form__control"
                id="image-url"
                name="profileImageUrl"
                onChange={this.handleChange}
                placeholder="IMAGE URL"
                type="test"
                value={profileImageUrl}
              />
            </>
          )}
          <button className="button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
