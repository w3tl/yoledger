/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import LoginBar from '../index';
import { wait, withProvider } from '../../testHelpers/index';

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

const Component = withProvider(props => (
  <LoginBar {...props} />
));

describe('LoginBarHOC', () => {
  it('should set token in localStorage after sign in', async () => {
    const handleSignin = jest.fn();
    const wrapper = mount(<Component loggedIn={false} handleSignin={handleSignin} />);
    await wait();
    wrapper.update();
    const form = wrapper.find('Login').find('form');
    form.simulate('submit');
    await wait(1);
    expect(handleSignin).toHaveBeenCalled();
  });

  it('should unset token and reset store after logout', async () => {
    const handleSignout = jest.fn();
    const wrapper = mount(<Component loggedIn handleSignout={handleSignout} />);
    await wait();
    wrapper.update();
    wrapper.find('Button').simulate('click');
    await wait(1);
    expect(handleSignout).toHaveBeenCalled();
  });
});
