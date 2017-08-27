import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos, deleteTodo }) => {
  const todoItems = todos.map(todo => (
    <li key={todo.id}>
      <button
        type="button"
        className="todo-delete"
        onClick={() => deleteTodo(todo.id)}
      >
        X
      </button>
      <span className="todo-text">{todo.text}</span>
    </li>
  ));

  return (
    <div className="task-list">
      <ul>
        {todoItems}
      </ul>
    </div>
  );
};


TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    },
  )).isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
