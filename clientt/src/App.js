import './App.scss';
import TodoList from './TodoList';
import {Link, Route} from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <div className="app__inner">
        <div className="app__heading">
          <h1 className="heading">Welcome to a todo list</h1>
        </div>
        <Route path="/todos" component={TodoList}/>
        <div className="app__button-container">
        <Link className="button" to="/todos">See my todos</Link>
        <Link className="button" to="/todos/new">Add a todo</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
