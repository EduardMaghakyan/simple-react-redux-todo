/* global expect, it, describe, jest */

import actions from './index';
import types from '../constants';

jest.mock('node-uuid', () => ({ v4: jest.fn(() => '1') }));

describe('Actions', () => {
  const todoText = 'A new todo';

  it('Creates action to add todo', () => {
    const expectedAction = {
      type: types.SUBMIT_TODO,
      id: '1',
      text: todoText,
    };

    expect(actions.submitTodo(todoText)).toEqual(expectedAction);
  });

  it('Creates action to delete a todo', () => {
    const expectedAction = {
      type: types.DELETE_TODO,
      id: 1,
    };

    expect(actions.deleteTodo(1)).toEqual(expectedAction);
  });

  it('Creates action when input is changed', () => {
    const inputText = 'To-Do Goes here';
    const expectedAction = {
      type: types.INPUT_CHANGED,
      inputText,
    };

    expect(actions.inputChanged(inputText)).toEqual(expectedAction);
  });

  it('Creates action to undo delete', () => {
    const expectedAction = {
      type: types.UNDO_DELETE,
    };

    expect(actions.undoLastDelete()).toEqual(expectedAction);
  });

  it('Creates action to toggle todo', () => {
    const expectedAction = {
      type: types.TOGGLE_TODO,
      id: 1,
    };

    expect(actions.toggleTodo(1)).toEqual(expectedAction);
  });
});
