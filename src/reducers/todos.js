import types from '../constants';

export const initialState = {
  todos: [],
  disableAddTodo: true,
  disableUndo: true,
  deleted: {},
};

const todo = (state, action) => {
  switch (action.type) {
    case types.SUBMIT_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case types.TOGGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed,
      };
    case types.DELETE_TODO:
      return state.id !== action.id;

    default:
      return state;
  }
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case types.SUBMIT_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          todo(undefined, action),
        ],
      };

    case types.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(t => todo(t, action)),
        deleted: state.todos.filter(t => t.id === action.id)[0],
        disableUndo: false,
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
    case types.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(t => todo(t, action)),
      };
    default:
      return state;
  }
};

export default todos;

export const getVisibleTodos = (state, filter) => {
  switch (filter) {
    case 'all':
      return state;
    case 'completed':
      return state.filter(t => t.completed);
    case 'active':
      return state.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};
