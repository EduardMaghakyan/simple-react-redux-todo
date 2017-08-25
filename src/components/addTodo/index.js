import React from 'react';
import PropTypes from 'prop-types';

const AddTodo = ({ submitTodo, inputChanged, disableAddTodo, undoLastDelete, disableUndo }) => {
  let input;
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitTodo(input.value);
          input.value = '';
        }}
      >
        <input
          className="todo-input"
          ref={(element) => {
            input = element;
          }}
          onChange={() => inputChanged(input.value)}
        />

        <button type="submit" className="todo-submit" disabled={disableAddTodo}>
          Add Todo
        </button>

        <button className="todo-undo" onClick={undoLastDelete} disabled={disableUndo}>
          Undo
        </button>

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
