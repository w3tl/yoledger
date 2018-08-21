/* eslint-disable react/destructuring-assignment,react/prop-types */
import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { withId } from '../utils';
import fragments from './fragments';
import { QUERY as LIST_QUERY } from './AssetListHOC';

export const QUERY = gql`
query AssetQuery($id: ID!) {
  account(id: $id) {
    ...AssetFormAccount
  }
}
${fragments.asset}
`;

export const ADD_MUTATION = gql`
mutation addAccount($input: AddAccountInput!) {
  addAccount(input: $input) {
    account {
      ...AssetFormAccount
    }
  }
}
${fragments.asset}
`;

const withQuery = Wrapped => (props) => {
  if (props.id) {
    return (
      <Query query={QUERY} skip={!props.id} variables={{ id: props.id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return 'Error!';
          return <Wrapped {...props} asset={data.account} />;
        }}
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
        variables: { type: 'ASSET' },
      });
      cache.writeQuery({
        query: LIST_QUERY,
        variables: { type: 'ASSET' },
        data: {
          accounts: accounts.concat(addAccount.account),
        },
      });
    }}
  >
    {(addAccount, { loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return error.message;
      if (data && data.addAccount) { // COMBAK: use variable to pathname
        return <Redirect to={{ pathname: '/assets' }} />;
      }
      return (
        <Wrapped
          {...props}
          onSave={asset => addAccount({
            variables: { input: { ...asset, type: 'ASSET' } },
          })}
        />);
    }}
  </Mutation>
);

export default Component => withId(withQuery(withAddMutation(Component)));
