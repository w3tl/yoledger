import React from 'react';
import { Mutation } from 'react-apollo';
import { SIGNOUT_MUTATION } from './queries';

const withSignoutMutation = Wrapped => props => (
  <Mutation
    mutation={SIGNOUT_MUTATION}
    onCompleted={(data) => {
      if (data.signout.success) {
        props.handleSignout();
      }
    }}
  >
    {(signout, { loading, error }) => (
      <Wrapped
        signout={signout}
        loading={loading}
        error={error}
        {...props}
      />)}
  </Mutation>
);

export default Component => withSignoutMutation(Component);
