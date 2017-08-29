import React from 'react';
import PropTypes from 'prop-types';

const AddTodo = ({ submitTodo, inputChanged, disableAddTodo, undoLastDelete, disableUndo }) => {
  let input;
  return (
    <div>
      <form
        className="add-todo"
        onSubmit={(event) => {
          event.preventDefault();
          submitTodo(input.value);
          input.value = '';
        }}
      >
        <input
          placeholder="Add new task..."
          className="todo-input"
          ref={(element) => {
            input = element;
          }}
          onChange={() => inputChanged(input.value)}
        />

        <div className="todo-actions">
          <button type="submit" className="todo-submit button" disabled={disableAddTodo}>
            Add Todo
          </button>

          <button className="todo-undo button" onClick={undoLastDelete} disabled={disableUndo}>
            Undo
          </button>
        </div>
      </form>
    </div>
  );
};

AddTodo.propTypes = {
  submitTodo: PropTypes.func.isRequired,
  inputChanged: PropTypes.func.isRequired,
  disableAddTodo: PropTypes.bool.isRequired,
  undoLastDelete: PropTypes.func.isRequired,
  disableUndo: PropTypes.bool.isRequired,
};

export default AddTodo;
