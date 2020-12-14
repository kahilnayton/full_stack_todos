import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchTodos } from '../actions/todos'
import TodoItem from "../components/TodoItem";

class TodoList extends Component {
  componentDidMount() {
    // there is no need to make this asynchronous because that will ne handled by redux thunk
    this.props.fetchTodos();
  }
  render() {
    const { todos } = this.props;
    todos.map((t) => (
      <TodoItem
        removeTodo={this.removeTodo(t._id)}
        task={t.task}
        key={t._id}
        date={t.createdAt}
      />
    ))
    return (
      <div>
        Todo List
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    todos: reduxState.todos
  }
}

export default connect(mapStateToProps, { fetchTodos })(TodoList)