import throttle from 'lodash/throttle';
import { createStore } from 'redux';
import todoApp, { appState } from './reducers';
import { loadState, saveState } from './storage';

const addLoggingToDispatch = (store) => {
  /* eslint-disable no-console */
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
  /* eslint-enable no-console */
};

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

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos.todos,
    });
  }, 500));

  return store;
};

export default configureStore;
