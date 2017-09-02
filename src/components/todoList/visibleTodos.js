import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import TodoList from './todoList';
import FetchError from '../fetchError';
import actions from '../../actions/';
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../../reducers';

class VisibleTodos extends Component {
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
      <TodoList
        {...this.props}
        todos={todos}
      />
    );
  }
}

VisibleTodos.defaultProps = {
  errorMessage: null,
};

VisibleTodos.propTypes = {
  submitTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    },
  )).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  fetchTodos: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const todoFilter = ownProps.match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, todoFilter),
    filter: todoFilter,
    isFetching: getIsFetching(state, todoFilter),
    errorMessage: getErrorMessage(state, todoFilter),
  };
};

VisibleTodos = withRouter(connect(mapStateToProps, actions)(VisibleTodos));

export default VisibleTodos;
