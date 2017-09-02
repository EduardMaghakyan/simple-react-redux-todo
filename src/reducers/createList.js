import { combineReducers } from 'redux';
import types from '../constants';

const deleted = [];

const createList = (filter) => {
  const handleToggle = (state, action) => {
    const { result: toggledId, entities } = action.response;
    const { completed } = entities.todos[toggledId];
    const shouldRemove = (
      (completed && filter === 'active') ||
      (!completed && filter === 'completed')
    );
    return shouldRemove ?
      state.filter(id => id !== toggledId) :
      state;
  };

  const ids = (state = [], action) => {
    switch (action.type) {
      case types.FETCH_TODOS_SUCCESS:
        return action.filter === filter ?
          action.response.result :
          state;
      case types.SUBMIT_TODO_SUCCESS:
        return filter !== 'completed' ?
          [...state, action.response.result] :
          state;
      case types.TOGGLE_TODO_SUCCESS:
        return handleToggle(state, action);
      case types.DELETE_TODO_SUCCESS:
        deleted.push(action.response.result);
        return state.filter(id => id !== action.response.result);
      case types.UNDO_DELETE_SUCCESS:
        deleted.length = 0;
        return [...state, action.response.result];
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case types.FETCH_TODOS_REQUEST:
        return true;
      case types.FETCH_TODOS_SUCCESS:
      case types.FETCH_TODOS_FAILURE:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (action.filter !== filter) {
      return state;
    }

    switch (action.type) {
      case types.FETCH_TODOS_FAILURE:
        return action.message;
      case types.FETCH_TODOS_SUCCESS:
      case types.FETCH_TODOS_REQUEST:
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};

export default createList;

export const getIds = state => state.ids;
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
export const getLastDeleted = () => deleted.pop();
