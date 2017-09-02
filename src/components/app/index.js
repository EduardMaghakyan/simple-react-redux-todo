import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import AddTodo from '../addTodo';
import TodoList from '../todoList';
import FetchError from '../fetchError';
import actions from '../../actions/';
import Filters from '../filters';
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../../reducers';

class App extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { isFetching, errorMessage, todos } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }

    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      );
    }
    return (
      <div className="app">
        <div className="header">
          <h2>To-Do List</h2>
        </div>
        <AddTodo
          {...this.props}
          disableAddTodo={this.props.disableAddTodo}
          disableUndo={this.props.disableUndo}
        />
        <Filters />
        <TodoList
          {...this.props}
          todos={todos}
        />
      </div>
    );
  }
}

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
  filter: PropTypes.string.isRequired,
  fetchTodos: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const todoFilter = ownProps.match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, todoFilter),
    disableUndo: state.byId.disableUndo,
    disableAddTodo: state.byId.disableAddTodo,
    filter: todoFilter,
    isFetching: getIsFetching(state, todoFilter),
    errorMessage: getErrorMessage(state, todoFilter),
  };
};

App = withRouter(connect(mapStateToProps, actions)(App));

export default App;
