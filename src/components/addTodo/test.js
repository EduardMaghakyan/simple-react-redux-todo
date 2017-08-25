/* global describe,it,expect,jest,beforeEach */
import React from 'react';
import {shallow, mount} from 'enzyme';
import AddTodo from '.';

describe('AddTodo Component', () => {
  let component;
  let mountedComponent;
  const submitMock = jest.fn();
  const changeMock = jest.fn();
  const undoLastDelete = jest.fn();

  beforeEach(() => {
    component = shallow(
      <AddTodo
        submitTodo={submitMock}
        inputChanged={changeMock}
        disableAddTodo
        undoLastDelete={undoLastDelete}
        disableUndo
      />,
    );

    mountedComponent = mount(
      <AddTodo
        submitTodo={submitMock}
        inputChanged={changeMock}
        disableAddTodo
        undoLastDelete={undoLastDelete}
        disableUndo
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
    expect(submitMock.mock.calls.length).toEqual(0);
    mountedComponent.find('form').simulate('submit');
    expect(submitMock.mock.calls.length).toEqual(1);
  });

  it('Should be disabled when there is no text', () => {
    const disabled = component.find('.todo-submit').html().includes('disabled=""');
    expect(disabled).toEqual(true);
  });

  it('Should be NOT disable when there is text', () => {
    component = shallow(
      <AddTodo
        submitTodo={submitMock}
        inputChanged={changeMock}
        disableAddTodo={false}
        undoLastDelete={undoLastDelete}
        disableUndo
      />,
    );
    const disabled = component.find('.todo-submit').html().includes('disabled=""');
    expect(disabled).toEqual(false);
  });

  describe('Undo button', () => {
    it('Should exist', () => {
      expect(component.find('.todo-undo').length).toEqual(1);
    });

    it('Should call undoDelete function', () => {
      expect(undoLastDelete.mock.calls.length).toEqual(0);
      component.find('.todo-undo').simulate('click');
      expect(undoLastDelete.mock.calls.length).toEqual(1);
    });

    it('Should be disabled.', () => {
      component = shallow(
        <AddTodo
          submitTodo={submitMock}
          inputChanged={changeMock}
          disableAddTodo
          undoLastDelete={undoLastDelete}
          disableUndo
        />,
      );
      const disabled = component.find('.todo-undo').html().includes('disabled=""');
      expect(disabled).toEqual(true);
    });

    it('Should NOT be disabled.', () => {
      component = shallow(
        <AddTodo
          submitTodo={submitMock}
          inputChanged={changeMock}
          disableAddTodo
          undoLastDelete={undoLastDelete}
          disableUndo={false}
        />,
      );
      const disabled = component.find('.todo-undo').html().includes('disabled=""');
      expect(disabled).toEqual(false);
    });
  });
});
