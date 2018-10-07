/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import { LoginBar } from '../index';
import { wait, withProvider } from '../../testHelpers';

jest.mock('react-router-dom', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

const Component = withProvider(props => (
  <LoginBar {...props} />
));

describe('LoginBarHOC', () => {
  it('should call props signout function after signout', async () => {
    const mockSignout = jest.fn();
    const wrapper = mount(<Component loggedIn handleSignout={mockSignout} />);
    await wait();
    wrapper.update();
    const button = wrapper.find('[name="signout"]');
    button.simulate('click');
    await wait(5);
    expect(mockSignout).toHaveBeenCalled();
  });
});
