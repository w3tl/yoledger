import React from 'react';
import { mount } from 'enzyme';
import { LoginPage as RawLoginPage } from '../index';
import { wait, withProvider } from '../../testHelpers';

const LoginPage = withProvider(props => (
  <RawLoginPage {...props} />
));

describe('Login', () => {
  it('should handle submit', async () => {
    const signin = jest.fn();
    const wrapper = mount(
      <LoginPage signin={signin} />,
    );
    await wait();
    wrapper.update();
    wrapper.find('Input[name="username"]').simulate('change', { target: { value: 'admin' } });
    wrapper.find('Input[name="password"]').simulate('change', { target: { value: 'password' } });
    wrapper.find('form').simulate('submit');
    expect(signin).toMatchSnapshot();
  });
});
