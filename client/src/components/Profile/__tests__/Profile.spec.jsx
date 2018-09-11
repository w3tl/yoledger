import React from 'react';
import { mount } from 'enzyme';
import Profile from '../Profile';
import { testRenderWithoutError } from '../../testHelpers';

const Component = props => <Profile changePassword={() => {}} {...props} />;

describe('Profile', () => {
  testRenderWithoutError(<Component />);

  describe('Change button', () => {
    it('should be disabled when the old or new password empty', () => {
      const output = mount(<Component />);
      expect(output.find('Button[type="submit"]').prop('disabled')).toBeTruthy();
    });
    it('should be disabled when the old password are equals to new', () => {
      const output = mount(<Component />);
      output.find('TextInput[name="oldPassword"]').simulate('change', { target: { value: 'password' } });
      expect(output.find('Button[type="submit"]').prop('disabled')).toBeTruthy();
      output.find('TextInput[name="newPassword"]').simulate('change', { target: { value: 'password' } });
      output.find('TextInput[name="repeatNewPassword"]').simulate('change', { target: { value: 'password' } });
      expect(output.find('Button[type="submit"]').prop('disabled')).toBeTruthy();
    });
    it('should be disabled when the new password does not match the repeat', () => {
      const output = mount(<Component />);
      output.find('TextInput[name="oldPassword"]').simulate('change', { target: { value: 'password' } });
      output.find('TextInput[name="newPassword"]').simulate('change', { target: { value: 'password1' } });
      output.find('TextInput[name="repeatNewPassword"]').simulate('change', { target: { value: 'password2' } });
      expect(output.find('Button[type="submit"]').prop('disabled')).toBeTruthy();
    });
    it('should be enabled when all fine', () => {
      const output = mount(<Component />);
      output.find('TextInput[name="oldPassword"]').simulate('change', { target: { value: 'password' } });
      output.find('TextInput[name="newPassword"]').simulate('change', { target: { value: 'password1' } });
      output.find('TextInput[name="repeatNewPassword"]').simulate('change', { target: { value: 'password1' } });
      expect(output.find('Button[type="submit"]').prop('disabled')).toBeFalsy();
    });
  });
  //
  // it('should disable submit button when', () => {
  //   const signin = jest.fn();
  //   const output = mount(
  //     <Login signin={signin} />,
  //   );
  //   output.find('TextInput[name="username"]').simulate('change', { target: { value: 'admin' } });
  //   output.find('TextInput[name="password"]').simulate('change', { target: { value: 'password' } });
  //   output.find('form').simulate('submit');
  //   expect(signin).toHaveBeenCalledWith({
  //     username: 'admin',
  //     password: 'password',
  //   });
  // });
});
