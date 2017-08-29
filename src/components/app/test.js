/* global it, expect, jest */

import React from 'react';
import { shallow } from 'enzyme';
import { App } from './index';
import { initialState } from '../../reducers/';

jest.mock('node-uuid', () => ({ v4: jest.fn(() => '1') }));


it('App renders without crashing', () => {
  const submitMock = jest.fn();
  const deleteMock = jest.fn();
  const changeMock = jest.fn();
  const undoLastDelete = jest.fn();

  const component = shallow(
    <App
      state={initialState}
      submitTodo={submitMock}
      todos={[]}
      deleteTodo={deleteMock}
      inputChanged={changeMock}
      disableAddTodo
      undoLastDelete={undoLastDelete}
      disableUndo
    />,
  );

  expect(component.exists()).toEqual(true);
});
