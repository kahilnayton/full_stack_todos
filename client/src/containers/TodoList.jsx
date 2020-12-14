import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTodos, removeTodo } from "../store/actions/todos";
import TodoItem from "../components/TodoItem";

const ObjectTest = {
  1: {
      id : 1,
      name:'ABC'
  },
  3: {
      id: 3,
      name:'DEF'
  }
}

class TodoList extends Component {
  componentDidMount() {
    // there is no need to make this asynchronous because that will ne handled by redux thunk
    this.props.fetchTodos();
  }

  _renderObject(todos){
    return Object.entries(todos).map(([key, value], i) => {

			return (
				<div key={key}>
					id is: {value._id} ;
					task: {value.task}
				</div>
			)
		})
  }
  
  render(){
    const { todos, removeMessage, currentUser } = this.props;
		return(
			<div>
				{todos && this._renderObject(todos)}
			</div>
		)
	}
}

function mapStateToProps(reduxState) {
  return {
    todos: reduxState.todos,
    currentUser: reduxState.currentUser.user.id,
  };
}

export default connect(mapStateToProps, { fetchTodos, removeTodo })(TodoList);
