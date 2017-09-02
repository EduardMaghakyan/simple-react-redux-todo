import types from '../constants';

export const initialState = {
  todos: [],
  disableAddTodo: true,
  disableUndo: true,
  deleted: {},
};

const byId = (state = initialState, action) => {
  if (action.response) {
    const newTodos = {
      ...state.todos,
      ...action.response.entities.todos,
    };
    return {
      ...state,
      todos: newTodos,
    };
  }

  switch (action.type) {
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

export default byId;

export const getTodo = (state, id) => state.todos[id];
