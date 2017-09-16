import React from 'react';
import AddTodo from '../addTodo';
import Filters from '../filters';
import VisibleTodos from '../todoList/visibleTodos';

const App = () => {
  return (
    <div className="app">
      <div className="header">
        <h2>To-Do List</h2>
      </div>
      <AddTodo {...this.props} />
      <Filters />
      <VisibleTodos {...this.props} />
    </div>
  );
};

export default App;
