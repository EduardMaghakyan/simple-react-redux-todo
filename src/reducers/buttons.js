import types from '../constants';

const initialState = {
  disableAddTodo: true,
  disableUndo: true,
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

    case types.DELETE_TODO_SUCCESS:
      return {
        ...state,
        disableUndo: false,
      };

    case types.UNDO_DELETE_SUCCESS:
      return {
        ...state,
        disableUndo: true,
      };

    default:
      return state;
  }
};

export default buttons;
