/* global expect, it, describe */

import types from '../constants';
import {reducer, initialState} from '.';

describe('Reducer', () => {
  const todoText = 'A new todo';

  it('Returns initailState when no action is passed!', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('Submit todo', () => {
    it('It adds todo to current state', () => {
      const action = {
        type: types.SUBMIT_TODO,
        id: 1,
        text: todoText,
      };

      const expectedState = {
        todos: [
          {
            id: 1,
            text: todoText,
          },
        ],
        disableAddTodo: true,
      };

      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('Delete todo', () => {
    it('deletes todo', () => {
      const startingState = {
        todos: [
          {
            id: 1,
            text: todoText,
          },
        ],
        disableAddTodo: true,
      };

      const action = {
        type: types.DELETE_TODO,
        id: 1,
      };

      const expectedState = {
        todos: [],
        disableAddTodo: true,
      };

      expect(reducer(startingState, action)).toEqual(expectedState);
    });
  });

  describe('Input changed', () => {
    it('Return same state if input is empty.', () => {
      const startingState = {
        todos: [],
        disableAddTodo: true,
      };

      const action = {
        type: types.INPUT_CHANGED,
        inputText: '',
      };

      const expectedState = {
        todos: [],
        disableAddTodo: true,
      };

      expect(reducer(startingState, action)).toEqual(expectedState);
    });

    it('Should return correct state when text is entered', () => {
      const startingState = {
        todos: [],
        disableAddTodo: true,
      };

      const action = {
        type: types.INPUT_CHANGED,
        inputText: todoText,
      };

      const expectedState = {
        todos: [],
        disableAddTodo: false,
      };

      expect(reducer(startingState, action)).toEqual(expectedState);
    });
  });
});
