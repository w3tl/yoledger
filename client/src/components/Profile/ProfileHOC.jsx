/* eslint-disable react/destructuring-assignment,react/prop-types */
import React from 'react';
import { Mutation } from 'react-apollo';
import { CHANGE_PASSWORD_MUTATION } from './queries';

const withChangePasswordMutation = Wrapped => props => (
  <Mutation
    mutation={CHANGE_PASSWORD_MUTATION}
    onCompleted={(data) => {
      localStorage.setItem('token', data.changePassword.token);
    }}
  >
    {(changePassword, { loading, error }) => {
      if (loading) return 'Change password...';
      if (error) return error.message;
      return (
        <Wrapped
          changePassword={({ oldPassword, newPassword }) => changePassword({
            variables: { oldPassword, newPassword },
          })}
          {...props}
        />);
    }}
  </Mutation>
);

export default Component => withChangePasswordMutation(Component);
