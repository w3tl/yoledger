/* eslint-disable react/destructuring-assignment,react/prop-types */
import React from 'react';
import { Mutation } from 'react-apollo';
import { SIGNIN_MUTATION, SIGNOUT_MUTATION } from './queries';

const withSigninMutation = Wrapped => props => (
  <Mutation
    mutation={SIGNIN_MUTATION}
    onCompleted={(data) => {
      props.handleSignin(data.signin.token);
    }}
  >
    {(signin, { loading, error }) => {
      if (loading) return 'Sign in...';
      if (error) return error.message;
      return (
        <Wrapped
          signin={({ username, password }) => signin({
            variables: { login: username, password },
          })}
          {...props}
        />);
    }}
  </Mutation>
);

const withSignoutMutation = Wrapped => props => (
  <Mutation
    mutation={SIGNOUT_MUTATION}
    onCompleted={(data) => {
      if (data.signout.success) {
        props.handleSignout();
      }
    }}
  >
    {(signout, {
      loading, error,
    }) => {
      if (loading) return 'Sign out...';
      if (error) return error.message;
      return (
        <Wrapped
          signout={signout}
          {...props}
        />);
    }}
  </Mutation>
);

export default Component => withSigninMutation(withSignoutMutation(Component));
