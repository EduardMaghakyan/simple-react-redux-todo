import { v4 } from 'node-uuid';
import types from '../constants';
import * as api from '../api';

let todoId;

const nextId = () => {
  todoId = v4();
  return todoId;
};

const receiveTodos = (filter, response) => ({
  type: types.RECEIVE_TODO,
  filter,
  response,
});

const actions = {

  fetchTodos(filter) {
    return api.fetchTodos(filter).then(response => receiveTodos(filter, response));
  },

  submitTodo(text) {
    return {
      type: types.SUBMIT_TODO,
      id: nextId(),
      text,
    };
  },

  deleteTodo(id) {
    return {
      type: types.DELETE_TODO,
      id,
    };
  },

  inputChanged(inputText) {
    return {
      type: types.INPUT_CHANGED,
      inputText,
    };
  },

  undoLastDelete() {
    return {
      type: types.UNDO_DELETE,
    };
  },

  toggleTodo(id) {
    return {
      type: types.TOGGLE_TODO,
      id,
    };
  },
};

export default actions;
