import throttle from 'lodash/throttle';
import { createStore } from 'redux';
import todoApp, { appState } from './reducers';
import { loadState, saveState } from './storage';

const configureStore = () => {
  const storedState = loadState();

  const persistedState = {
    todos: {
      ...appState,
      todos: storedState ? storedState.todos : [],
    },
  };

  const store = createStore(
    todoApp,
    persistedState,
  );

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos.todos,
    });
  }, 500));

  return store;
};

export default configureStore;
