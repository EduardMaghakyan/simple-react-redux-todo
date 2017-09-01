import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import AddTodo from '../addTodo';
import TodoList from '../todoList';
import actions from '../../actions/';
import Filters from '../filters';
import { getVisibleTodos } from '../../reducers';

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
          todos={this.props.todos}
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
};

const mapStateToProps = (state, ownProps) => {
  const todoFilter = ownProps.match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state.todos, todoFilter),
    disableUndo: state.todos.byId.disableUndo,
    disableAddTodo: state.todos.byId.disableAddTodo,
    filter: todoFilter,
  };
};

App = withRouter(connect(mapStateToProps, actions)(App));

export default App;
