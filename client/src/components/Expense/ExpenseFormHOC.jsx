/* eslint-disable react/destructuring-assignment,react/prop-types */
import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { withId } from '../utils';
import { FORM_QUERY, ADD_MUTATION, LIST_QUERY } from './queries';

const withQuery = Wrapped => (props) => {
  if (props.id) {
    return (
      <Query query={FORM_QUERY} skip={!props.id} variables={{ id: props.id }}>
        {({ loading, error, data }) => (
          <Wrapped expense={data.account} loading={loading} error={error} {...props} />
        )}
      </Query>
    );
  }
  return <Wrapped {...props} />;
};

const withAddMutation = Wrapped => props => (
  <Mutation
    mutation={ADD_MUTATION}
    update={(cache, { data: { addAccount } }) => {
      const { accounts } = cache.readQuery({
        query: LIST_QUERY,
        variables: { type: 'EXPENSE' },
      });
      cache.writeQuery({
        query: LIST_QUERY,
        variables: { type: 'EXPENSE' },
        data: {
          accounts: accounts.concat(addAccount.account),
        },
      });
    }}
  >
    {(addAccount, { loading, error, data }) => {
      if (data && data.addAccount) { // COMBAK: use variable to pathname
        return <Redirect to={{ pathname: '/expenses' }} />;
      }
      return (
        <Wrapped loading={loading} error={error} onSave={addAccount} {...props} />);
    }}
  </Mutation>
);

export default Component => withId(withQuery(withAddMutation(Component)));
