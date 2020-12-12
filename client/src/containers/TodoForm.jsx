import React, { Component } from 'react';
import { connect } from 'react-redux'
import {addTodo} from '../actions/todos'

class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      task: ""
    }
  }
  handleChange(e) {
    this.setState({
    [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.addTodo(this.state.task)
    this.setState({todo: ''})
    e.target.reset()
    this.props.history.push('/')
  }
  render() {
    return (
      <form className="app__todo-form" onSubmit={this.handleSubmit}>
        <label htmlFor="task">Task</label>
        <input
          type="text"
          name="task"
          id="task"
          onChange={this.handleChange}
        /> 
        <button type="submit" className="button">Add</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  }
}

export default connect(mapStateToProps, {addTodo})(TodoForm);