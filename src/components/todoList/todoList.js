import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos, deleteTodo, toggleTodo }) => {
  const todoItems = todos.map(todo => (
    <li
      key={todo.id}
    >
      <button
        type="button"
        className="todo-delete"
        onClick={() => deleteTodo(todo.id)}
      >
        X
      </button>
      <label onClick={() => toggleTodo(todo.id)} htmlFor={todo.id}>
        <span
          id={todo.id}
          className="todo-text"
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.text}
        </span>
      </label>
    </li>
  ));

  return (
    <div className="todo-list">
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
      completed: PropTypes.bool.isRequired,
    },
  )).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
};

export default TodoList;
