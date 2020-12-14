import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTodos, removeTodo } from "../store/actions/todos";
import TodoItem from "../components/TodoItem";

class TodoList extends Component {
  componentDidMount() {
    // there is no need to make this asynchronous because that will ne handled by redux thunk
    this.props.fetchTodos();
  }
  render() {
    const { todos, removeMessage, currentUser } = this.props;
//     TODO: NEED TO ITERATE OVER A NESTED OBJECT
//     todos:
// 0:
// createdAt: "2020-12-14T18:27:21.448Z"
// task: "jump"
// updatedAt: "2020-12-14T18:27:21.448Z"
// user: {_id: "5fd776fe4bb3006c3522d387", username: "test123", profileImageUrl: ""}
// __v: 0
// _id: "5fd7ae89bf367af3e8bded42"
// __proto__: Object
// 1: {_id: "5fd7ac898a59f2f19283437a", task: "sex", user: {…}, createdAt: "2020-12-14T18:18:49.814Z", updatedAt: "2020-12-14T18:18:49.814Z", …}
// 2: {_id: "5fd7ac7d8a59f2f192834379", task: "play soccer ", user: {…}, createdAt: "2020-12-14T18:18:37.773Z", updatedAt: "2020-12-14T18:18:37.773Z", …}
// 3: {_id: "5fd7abd88a59f2f192834378", 

    let taskList = {};

  //   if(todos) {
  //     taskList = Object.keys(todos).map(key => {
  //         <li value={key}>{todos[key]}</li>
  //     });
  // }
    return (
      <div className="todo-list">
        <ul>

        </ul>
      </div>
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
