import { combineReducers } from 'redux';
import types from '../constants';

export const initialState = {
  todos: [],
  disableAddTodo: true,
  disableUndo: true,
  deleted: {},
};

const byId = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_TODOS:
      const nextState = { ...state };
      action.response.forEach((todo) => {
        nextState.todos[todo.id] = todo;
      });
      return nextState;

    case types.INPUT_CHANGED:
      return {
        ...state,
        disableAddTodo: action.inputText === '',
      };

    case types.UNDO_DELETE:
      return {
        ...state,
        todos: [
          ...state.todos,
          state.deleted,
        ],
        deleted: {},
        disableUndo: true,
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  if (action.filter !== 'all') {
    return state;
  }
  switch (action.type) {
    case types.RECEIVE_TODOS:
      return action.response.map(t => t.id);
    default:
      return state;
  }
};

const activeIds = (state = [], action) => {
  if (action.filter !== 'active') {
    return state;
  }
  switch (action.type) {
    case types.RECEIVE_TODOS:
      return action.response.map(t => t.id);
    default:
      return state;
  }
};

const completedIds = (state = [], action) => {
  if (action.filter !== 'completed') {
    return state;
  }
  switch (action.type) {
    case types.RECEIVE_TODOS:
      return action.response.map(t => t.id);
    default:
      return state;
  }
};

const idsByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds,
});

const todos = combineReducers({
  byId,
  idsByFilter,
});

export default todos;

export const getVisibleTodos = (state, filter) => {
  const ids = state.idsByFilter[filter];
  return ids.map(id => state.byId.todos[id]);
};
