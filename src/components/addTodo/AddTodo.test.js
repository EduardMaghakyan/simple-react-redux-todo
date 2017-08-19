/* global browser, describe, it */
import React from 'react';
import { shallow } from 'enzyme';
import AddTodo from '.';

describe('AddTodo Component', () => {
  it('Should render component', () => {
    const component = shallow(<AddTodo/>);
    expect(component.exists()).toEqual(true);
  });
});
