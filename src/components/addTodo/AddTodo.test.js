/* global describe,it,expect,jest,beforeEach */
import React from 'react';
import { shallow, mount } from 'enzyme';
import AddTodo from '.';

describe('AddTodo Component', () => {
  let component;
  const submitMock = jest.fn();

  beforeEach(() => {
    component = shallow(
      <AddTodo
        submitTodo={submitMock}
      />,
    );
  });

  it('Should render component', () => {
    expect(component.exists()).toEqual(true);
  });

  it('Should render on input', () => {
    expect(component.find('.todo-input').length).toEqual(1);
  });

  it('Should add a submit button', () => {
    expect(component.find('.todo-submit').length).toEqual(1);
  });

  it('Should call submitTodo function', () => {
    component = mount(<AddTodo submitTodo={submitMock} />);

    expect(submitMock.mock.calls.length).toEqual(0);
    component.find('form').simulate('submit');
    expect(submitMock.mock.calls.length).toEqual(1);
  });
});
