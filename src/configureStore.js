import throttle from 'lodash/throttle';
import { combineReducers, createStore } from 'redux';
import todoListApp, { initialState } from './reducers';
import { loadState, saveState } from './storage';

const configureStore = () => {
  const reducers = combineReducers({
    todoListApp,
  });

  const storedState = loadState();

  const persistedState = {
    todoListApp: {
      ...initialState,
      todos: storedState ? storedState.todos : [],
    },
  };

  const store = createStore(
    reducers,
    persistedState,
  );

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todoListApp.todos,
    });
  }, 500));

  return store;
};

export default configureStore;
