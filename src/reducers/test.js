/* global expect, it, describe */

import byId from './byId';

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
