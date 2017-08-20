import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AddTodo from './components/addTodo';
import actions from './actions/';

export const App = () => (
  <div>
    <h1>To-Do List</h1>
    <AddTodo submitTodo={() => {}} />
  </div>
);

App.propTypes = {
  submitTodo: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.todoListApp;

const mapDispatchToProps = dispatch => ({
  submitTodo: (text) => {
    if (text) {
      dispatch(actions.submitTodo(text));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
