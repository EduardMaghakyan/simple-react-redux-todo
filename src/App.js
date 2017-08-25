import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AddTodo from './components/addTodo';
import TodoList from './components/todoList';
import actions from './actions/';

export const App = ({ submitTodo, todos, deleteTodo, inputChanged, disableAddTodo, undoLastDelete }) => (
  <div>
    <h1>To-Do List</h1>
    <AddTodo
      submitTodo={submitTodo}
      inputChanged={inputChanged}
      disableAddTodo={disableAddTodo}
      undoLastDelete={undoLastDelete}
    />
    <TodoList todos={todos} deleteTodo={deleteTodo} />
  </div>
);

App.propTypes = {
  submitTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    },
  )).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  inputChanged: PropTypes.func.isRequired,
  disableAddTodo: PropTypes.bool.isRequired,
  undoLastDelete: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.todoListApp;

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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
