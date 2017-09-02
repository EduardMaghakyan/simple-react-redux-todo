import { v4 } from 'node-uuid';
import types from '../constants';
import * as api from '../api';
import { getIsFetching } from '../reducers';

let todoId;

const nextId = () => {
  todoId = v4();
  return todoId;
};

const actions = {

  fetchTodos(filter) {
    return (dispatch, getState) => {
      if (getIsFetching(getState(), filter)) {
        return Promise.resolve();
      }
      dispatch({
        type: types.FETCH_TODOS_REQUEST,
        filter,
      });
      return api.fetchTodos(filter).then(
        (response) => {
          dispatch({
            type: types.FETCH_TODOS_SUCCESS,
            filter,
            response,
          });
        },
        (error) => {
          dispatch({
            type: types.FETCH_TODOS_FAILURE,
            filter,
            message: error.message || 'Something went terribly wrong!',
          });
        },
      );
    };
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
