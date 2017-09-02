/* global expect, it, describe, jest */

import actions from './index';
import types from '../constants';

jest.mock('node-uuid', () => ({ v4: jest.fn(() => '1') }));

describe('Actions', () => {
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
});
