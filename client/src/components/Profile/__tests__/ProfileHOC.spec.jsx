/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import Profile from '../index';
import { wait, withProvider } from '../../testHelpers';

const Component = withProvider(props => (
  <Profile {...props} />
));

describe('ProfileHOC', () => {
  it('should set token in localStorage after changePassword', async () => {
    localStorage.removeItem('token');
    const wrapper = mount(<Component />);
    await wait();
    wrapper.update();
    const form = wrapper.find('Profile').find('form');
    form.find('Input[name="oldPassword"]').simulate('change', { target: { value: 'password' } });
    form.find('Input[name="newPassword"]').simulate('change', { target: { value: 'password1' } });
    form.find('Input[name="repeatNewPassword"]').simulate('change', { target: { value: 'password1' } });
    form.simulate('submit');
    await wait(1);
    expect(localStorage.getItem('token')).toBeDefined();
  });
});
