/* eslint-disable react/destructuring-assignment,react/prop-types */
import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { withId } from '../utils';
import { FORM_QUERY, LIST_QUERY, ADD_MUTATION } from './queries';

const withQuery = Wrapped => (props) => {
  if (props.id) {
    return (
      <Query query={FORM_QUERY} skip={!props.id} variables={{ id: props.id }}>
        {({ loading, error, data }) => (
          <Wrapped income={data.account} loading={loading} error={error} {...props} />
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
        variables: { type: 'INCOME' },
      });
      cache.writeQuery({
        query: LIST_QUERY,
        variables: { type: 'INCOME' },
        data: {
          accounts: accounts.concat(addAccount.account),
        },
      });
    }}
  >
    {(addAccount, { loading, error, data }) => {
      if (data && data.addAccount) { // COMBAK: use variable to pathname
        return <Redirect to={{ pathname: '/incomes' }} />;
      }
      return (
        <Wrapped onSave={addAccount} loading={loading} error={error} {...props} />);
    }}
  </Mutation>
);

export default Component => withId(withQuery(withAddMutation(Component)));
