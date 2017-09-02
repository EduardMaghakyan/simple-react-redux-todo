import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../actions';

const AddTodo = (
  {
    submitTodo,
    inputChanged,
    disableAddTodo,
    undoLastDelete,
    disableUndo,
  }) => {
  let input;
  return (
    <div className="add-todo">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitTodo(input.value);
          input.value = '';
        }}
      >
        <input
          placeholder="Add new todo..."
          className="todo-input"
          ref={(element) => {
            input = element;
          }}
          onChange={() => inputChanged(input.value)}
        />

        <div className="todo-actions">
          <button
            type="submit"
            className="todo-submit button"
            disabled={disableAddTodo}
          >
            Add Todo
          </button>

          <button
            type="button"
            className="todo-undo button"
            onClick={() => undoLastDelete()}
            disabled={disableUndo}
          >
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

const mapStateToProps = state => ({
  disableUndo: state.buttons.disableUndo,
  disableAddTodo: state.buttons.disableAddTodo,
});

export default connect(mapStateToProps, actions)(AddTodo);
