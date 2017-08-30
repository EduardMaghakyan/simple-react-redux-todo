import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import AddTodo from '../addTodo';
import TodoList from '../todoList';
import actions from '../../actions/';
import Filters from '../filters';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter(t => t.completed);
    case 'active':
      return todos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};

export const App = ({
  submitTodo,
  todos,
  deleteTodo,
  inputChanged,
  disableAddTodo,
  undoLastDelete,
  disableUndo,
  toggleTodo,
}) => (
  <div className="app">
    <div className="header">
      <h2>To-Do List</h2>
    </div>
    <AddTodo
      submitTodo={submitTodo}
      inputChanged={inputChanged}
      disableAddTodo={disableAddTodo}
      undoLastDelete={undoLastDelete}
      disableUndo={disableUndo}
    />
    <Filters />
    <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
  </div>
);

App.propTypes = {
  submitTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    },
  )).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  inputChanged: PropTypes.func.isRequired,
  disableAddTodo: PropTypes.bool.isRequired,
  undoLastDelete: PropTypes.func.isRequired,
  disableUndo: PropTypes.bool.isRequired,
  toggleTodo: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(state.todoListApp.todos, ownProps.match.params.filter || 'active'),
  disableUndo: state.todoListApp.disableUndo,
  disableAddTodo: state.todoListApp.disableAddTodo,
});

const mapDispatchToProps = dispatch => ({
  submitTodo: (text) => {
    if (text) {
      dispatch(actions.submitTodo(text));
    }
  },

  inputChanged: (text) => {
    dispatch(actions.inputChanged(text));
  },

  deleteTodo: (id) => {
    dispatch(actions.deleteTodo(id));
  },

  undoLastDelete: () => {
    dispatch(actions.undoLastDelete());
  },

  toggleTodo: (id) => {
    dispatch(actions.toggleTodo(id));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
