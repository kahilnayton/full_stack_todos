import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTodos, removeTodo } from "../store/actions/todos";
import TodoItem from "../components/TodoItem";

class TodoList extends Component {
  componentDidMount() {
    // there is no need to make this asynchronous because that will ne handled by redux thunk
    this.props.fetchTodos();
  }

  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.todos !== this.props.todos) {
      console.log('update')
    }
  }

  // Object.entries iterates over all the keys in the todos object
  _renderObject(todos, removeTodo, currentUser) {
    return Object.entries(todos).map(([key, t], i) => {
      // Ensure you bind the right todo id and user id to delete

      if (t.user && t.user._id === currentUser) {

        return (
          <TodoItem
            removeTodo={removeTodo.bind(this, t.user._id, t._id)}
            date={t.createdAt}
            key={key}
            task={t.task}
          />
        );
      }
    });
  }

  render() {
    const { todos, removeTodo, currentUser } = this.props;
    return (
      <div>{todos && this._renderObject(todos, removeTodo, currentUser)}</div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    todos: reduxState.todos,
    currentUser: reduxState.currentUser.user.id,
  };
}

export default connect(mapStateToProps, { fetchTodos, removeTodo })(TodoList);
