import React from 'react';
import { Mutation } from 'react-apollo';
import { SIGNIN_MUTATION } from './queries';

const withSigninMutation = Wrapped => ({ signin, ...props }) => (
  <Mutation
    mutation={SIGNIN_MUTATION}
    onCompleted={({ signin: { token } }) => signin(token)}
  >
    {(mutate, { loading, error }) => (
      <Wrapped signin={mutate} loading={loading} error={error} {...props} />
    )}
  </Mutation>
);

export default Component => withSigninMutation(Component);
