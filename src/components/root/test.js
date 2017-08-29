/* global it, expect, jest */

import React from 'react';
import {shallow} from 'enzyme';
import Root from './index';

jest.mock('node-uuid', () => ({ v4: jest.fn(() => '1') }));

it('Root renders without crashing', () => {
  const store = {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: jest.fn(),
  };

  const component = shallow(
    <Root
      store={store}
    />,
  );

  expect(component.exists()).toEqual(true);
});
