/* eslint-disable react/destructuring-assignment,react/prop-types */
import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { withId } from '../utils';
import fragments from './fragments';

export const QUERY = gql`
query TransactionQuery($id: ID!) {
  transaction(id: $id) {
    ...TransactionFormTransaction
  }
}
${fragments.transaction}
`;

export const ADD_MUTATION = gql`
mutation addTransaction($input: AddTransactionInput!) {
  addTransaction(input: $input) {
    transaction {
      ...TransactionFormTransaction
    }
  }
}
${fragments.transaction}
`;

export const DELETE_MUTATION = gql`
mutation deleteTransaction($id: ID!) {
  success
}
`;

const withQuery = Wrapped => (props) => {
  if (props.id) {
    return (
      <Query query={QUERY} skip={!props.id} variables={{ id: props.id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return 'Error query!';
          return <Wrapped {...props} transaction={data.transaction} />;
        }}
      </Query>
    );
  }
  return <Wrapped {...props} />;
};

const withAddMutation = Wrapped => props => (
  <Mutation mutation={ADD_MUTATION}>
    {(addTransaction, { loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return 'Error mutation!';
      if (data && data.addTransaction) {
        const { addTransaction: { transaction } } = data; // COMBAK: use variable to pathname
        return <Redirect to={{ pathname: '/transactions/view', state: { id: transaction.id } }} />;
      }
      return (
        <Wrapped
          {...props}
          onSave={transaction => addTransaction({
            variables: { input: transaction },
          })}
        />);
    }}
  </Mutation>
);

const withDeleteMutation = Wrapped => props => (
  <Mutation mutation={DELETE_MUTATION}>
    {(deleteTransaction, { loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return 'Error delete mutation';
      if (data && data.deleteTransaction && data.deleteTransaction.success) {
        return <Redirect to="/transactions" />;
      }
      if (props.transaction) {
        return (
          <Wrapped
            {...props}
            onDelete={() => deleteTransaction({ variables: { id: props.transaction.id } })}
          />);
      }
      return <Wrapped {...props} />;
    }}
  </Mutation>
);

export default Component => withId(withQuery(withAddMutation(withDeleteMutation(Component))));
