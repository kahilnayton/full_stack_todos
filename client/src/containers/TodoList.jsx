import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTodos, removeTodo, updateTodo } from "../store/actions/todos";
import TodoItem from "../components/TodoItem";

class TodoList extends Component {
  componentDidMount() {
    // there is no need to make this asynchronous because that will ne handled by redux thunk
    this.props.fetchTodos();
  }
  

  // Object.entries iterates over all the keys in the todos object
  renderTodos(todos, removeTodo, currentUser, updateTodo) {
    return todos.map(t => {
      // Ensure you bind the right todo id and user id to delete

      if (t.user && t.user._id === currentUser) {

        return (
          <TodoItem
            removeTodo={removeTodo.bind(this, t.user._id, t._id)}
            updateTodo={updateTodo.bind(this, t.user._id, t._id)}
            date={t.createdAt}
            key={t._id}
            task={t.task}
            done={t.done}
          />
        );
      }
    });
  }

  render() {
    const { todos, removeTodo, currentUser, updateTodo } = this.props;
    return (
      <div>{todos && this.renderTodos(todos, removeTodo, currentUser, updateTodo)}</div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    todos: reduxState.todos,
    currentUser: reduxState.currentUser.user.id,
  };
}

export default connect(mapStateToProps, { fetchTodos, removeTodo, updateTodo })(TodoList);
