/* global it, expect, jest */

import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import { initialState } from './reducers/';

it('App renders without crashing', () => {
  const submitMock = jest.fn();
  const deleteMock = jest.fn();
  const changeMock = jest.fn();

  const component = shallow(
    <App
      state={initialState}
      submitTodo={submitMock}
      todos={[]}
      deleteTodo={deleteMock}
      inputChanged={changeMock}
      disableAddTodo
    />,
  );

  expect(component.exists()).toEqual(true);
});
