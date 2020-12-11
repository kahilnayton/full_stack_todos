import React, { Component } from 'react';
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'
import { connect } from 'react-redux'
import { getTodos, addTodo, removeTodo } from './actionCreators';
import { Route } from 'react-router-dom'

class TodoList extends Component {
  constructor(props) {
    // Super makes sure the right prototypal inheritance comes in from the extended react component
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    // there is no need to make this asynchronous because that will ne handled by redux thunk
    this.props.getTodos();
  }
  handleSubmit(val) {
    this.props.addTodo(val)
  }
  removeTodo(id) {
    this.props.removeTodo(id);
  }

  render() {
    let todos = this.props.todos.map(val => (
      <TodoItem
        removeTodo={this.removeTodo.bind(this, val._id)}
        task={val.task}
        key={val._id}
      />
    ))
    return (
      <div>
        <Route
          path="/todos/new"
          component={props => (
            <TodoForm {...props} handleSubmit={this.handleSubmit} />
          )}
        />
        <Route exact path="/todos" component={() => <div>{todos}</div>} />
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    todos: reduxState.todos
  }
}

export default connect(mapStateToProps, { addTodo, removeTodo, getTodos })(TodoList);