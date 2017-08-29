/* global describe, it, expect, jest */
import React from 'react';
import { shallow} from 'enzyme';
import TodoList from '.';

jest.mock('node-uuid', () => ({ v4: jest.fn(() => '1') }));


describe('Render list of todos', () => {
  const deleteMock = jest.fn();
  const toggleTodo = jest.fn();

  const props = {
    todos: [
      {
        id: '1',
        text: 'First Todo',
        completed: false,
      },
    ],

    deleteTodo: deleteMock,
  };

  const component = shallow(<TodoList todos={props.todos} deleteTodo={props.deleteTodo} toggleTodo={toggleTodo} />);

  it('Should render todo list', () => {
    expect(component.exists()).toEqual(true);
  });

  it('Render todo when passed in props', () => {
    expect(component.find('.todo-text').text()).toEqual(props.todos[0].text);
  });

  it('Calls deleteTodo function when delete button is clicked', () => {
    expect(deleteMock.mock.calls.length).toEqual(0);
    component.find('.todo-delete').simulate('click');
    expect(deleteMock.mock.calls.length).toEqual(1);
  });
});
