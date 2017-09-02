import types from '../constants';

const initialState = {
  disableAddTodo: true,
  disableUndo: true,
  deleted: {},
};

const buttons = (state = initialState, action) => {
  switch (action.type) {
    case types.SUBMIT_TODO_SUCCESS:
      return {
        ...state,
        disableAddTodo: true,
      };
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

export default buttons;
