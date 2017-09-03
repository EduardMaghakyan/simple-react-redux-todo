/* global expect, it, describe */
import types from '../constants';
import byId from './byId';
import buttons from './buttons';
import createList, * as fromList from './createList';

describe('byId Reducer', () => {
  it('Returns initialState when no action is passed!', () => {
    const initialState = {
      todos: [],
    };
    expect(byId(undefined, {})).toEqual(initialState);
  });

  it('Merges todos when there is response.', () => {
    const addedTodos = [
      {
        id: 1,
        text: 'ho',
        completed: true,
        deleted: false,
      },
    ];
    const initialTodos = [
      {
        id: 2,
        text: 'let’s go',
        completed: false,
        deleted: false,
      },
    ];
    const initialState = {
      todos: initialTodos,
    };

    const action = {
      response: {
        entities: {
          todos: addedTodos,
        },
      },
    };

    const expectedTodos = {
      ...initialState.todos,
      ...action.response.entities.todos,
    };

    const expectedState = {
      todos: expectedTodos,
    };

    expect(byId(initialState, action)).toEqual(expectedState);
  });
});

describe('buttons Reducer', () => {
  it('Disables add todo', () => {
    const initialState = {
      disableAddTodo: false,
      disableUndo: true,
    };

    const action = {
      type: types.SUBMIT_TODO_SUCCESS,
    };

    const actual = buttons(initialState, action);
    expect(true, actual.disableAddTodo);
  });

  it('Enable add todo', () => {
    const initialState = {
      disableAddTodo: true,
      disableUndo: true,
    };

    const action = {
      type: types.INPUT_CHANGED,
      text: 'some text',
    };

    const actual = buttons(initialState, action);
    expect(false, actual.disableAddTodo);
  });

  it('Disables undo button.', () => {
    const initialState = {
      disableAddTodo: true,
      disableUndo: false,
    };

    const action = {
      type: types.DELETE_TODO_SUCCESS,
    };

    const actual = buttons(initialState, action);
    expect(true, actual.disableUndo);
  });

  it('Enables undo button.', () => {
    const initialState = {
      disableAddTodo: true,
      disableUndo: true,
    };

    const action = {
      type: types.UNDO_DELETE_SUCCESS,
    };

    const actual = buttons(initialState, action);
    expect(false, actual.disableUndo);
  });
});
