import types from '../constants';
import * as api from '../api';
import { getIsFetching } from '../reducers';

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
    return (dispatch) => {
      api.addTodo(text).then((response) => {
        dispatch({
          type: types.SUBMIT_TODO_SUCCESS,
          response,
        });
      });
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
    return (dispatch) => {
      api.toggleTodo(id).then((response) => {
        dispatch({
          type: types.TOGGLE_TODO,
          response,
        });
      });
    };
  },
};

export default actions;
