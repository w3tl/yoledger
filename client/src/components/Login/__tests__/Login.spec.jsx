import React from 'react';
import { mount } from 'enzyme';
import Login from '../Login';
import { testRenderWithoutError } from '../../testHelpers';

describe('Login', () => {
  testRenderWithoutError(<Login signin={() => {}} />);

  it('should handle submit', () => {
    const signin = jest.fn();
    const output = mount(
      <Login signin={signin} />,
    );
    output.find('TextInput[name="username"]').simulate('change', { target: { value: 'admin' } });
    output.find('TextInput[name="password"]').simulate('change', { target: { value: 'password' } });
    output.find('form').simulate('submit');
    expect(signin).toHaveBeenCalledWith({
      username: 'admin',
      password: 'password',
    });
  });
});
