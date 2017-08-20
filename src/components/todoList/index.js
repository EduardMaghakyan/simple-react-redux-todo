import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos }) => {
  console.log(todos);
  const todoItems = todos.map(todo => (
    <li key={todo.id}>
      <span className="todo-text">{todo.text}</span>
    </li>
  ));

  return (
    <ul>
      {todoItems}
    </ul>
  );
};


TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    },
  )).isRequired,

};
export default TodoList;
