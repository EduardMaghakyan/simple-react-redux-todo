/* global expect, it, describe */

import actions from './index';
import types from '../constants';

describe('Actions', () => {
  const todoText = 'A new todo';

  it('Creates action to add todo', () => {
    const expectedAction = {
      type: types.SUBMIT_TODO,
      id: 1,
      text: todoText,
    };

    expect(actions.submitTodo(todoText)).toEqual(expectedAction);
  });
});
