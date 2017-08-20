/* global describe, it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '.';

describe('Render list of todos', () => {
  const todos = [
    {
      id: 1,
      text: 'First Todo',
    },
  ];
  const component = shallow(<TodoList todos={todos} />);
  it('Should render todo list', () => {
    expect(component.exists()).toEqual(true);
  });

  it('Render todo when passed in props', () => {
    expect(component.find('.todo-text').text()).toEqual(todos[0].text);
  });
});
