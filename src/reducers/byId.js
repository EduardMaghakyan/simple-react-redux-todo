const initialState = {
  todos: [],
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

  return state;
};

export default byId;

export const getTodo = (state, id) => state.todos[id];
