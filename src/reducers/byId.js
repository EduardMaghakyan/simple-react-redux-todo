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

export default byId;

export const getTodo = (state, id) => state[id];
