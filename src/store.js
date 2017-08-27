import { combineReducers, createStore } from 'redux';
import todoListApp, { initialState } from './reducers';
import { loadState, saveState } from './storage';

const reducers = combineReducers({
  todoListApp,
});

const persistedState = {
  todoListApp: {
    ...initialState,
    todos: loadState() ? loadState().todos : [],
  },
};

const store = createStore(
  reducers,
  persistedState,
);

store.subscribe(() => {
  saveState({
    todos: store.getState().todoListApp.todos,
  });
});

export default store;
