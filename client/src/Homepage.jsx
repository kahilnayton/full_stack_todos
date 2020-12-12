import React, {Component} from "react";
import { Link } from "react-router-dom";

import TodoItem from "./TodoItem";

export default class Homepage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    debugger;
    const { currentUser, todos } = this.props
    if (!currentUser.isAuthenticated) {
      return (
        <div>
          <h1>Homepage</h1>
        </div>
      );
    }
    todos.map((val) => (
      <TodoItem
        removeTodo={this.removeTodo.bind(this, val._id)}
        task={val.task}
        key={val._id}
      />
    ));
    return (
      <div>
        <h1>logged in</h1>
      </div>
    )
  }
}

