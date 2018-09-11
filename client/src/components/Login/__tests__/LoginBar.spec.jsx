import React from 'react';
import { mount } from 'enzyme';
import LoginBar from '../LoginBar';
import { testRenderWithoutError } from '../../testHelpers';

jest.mock('../Login', () => () => (
  <div>Login</div>));

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('LoginBar', () => {
  testRenderWithoutError(<LoginBar signin={() => {}} signout={() => {}} loggedIn />);

  it('should render signout button when user logged in', () => {
    const signout = jest.fn();
    const output = mount(
      <LoginBar signin={() => {}} signout={signout} loggedIn />,
    );
    expect(output).toMatchSnapshot();
    output.find('Button').simulate('click');
    expect(signout).toHaveBeenCalled();
  });

  it('should render Login component when user not are logged in', () => {
    const output = mount(
      <LoginBar signout={() => {}} signin={() => {}} loggedIn={false} />,
    );
    expect(output).toMatchSnapshot();
  });
});
