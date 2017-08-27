import { combineReducers, createStore } from 'redux';
import todoListApp from './reducers';
import { loadState, saveState } from './storage';

const reducers = combineReducers({
  todoListApp,
});

const persistedState = loadState();

const store = createStore(
  reducers,
  persistedState,
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
