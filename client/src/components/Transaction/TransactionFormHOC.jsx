/* eslint-disable react/destructuring-assignment,react/prop-types */
import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { withId } from '../utils';
import fragments from './fragments';
import { QUERY as LIST_QUERY } from './TransactionListHOC';

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
  deleteTransaction(id: $id) {
    success
    id
  }
}
`;

export const UPDATE_MUTATION = gql`
mutation updateTransaction($id: ID!, $input: UpdateTransactionInput!) {
  updateTransaction(id: $id, input: $input) {
    transaction {
      ...TransactionFormTransaction
    }
  }
}
${fragments.transaction}
`;

const withQuery = Wrapped => (props) => {
  if (props.id) {
    return (
      <Query query={QUERY} skip={!props.id} variables={{ id: props.id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return error.message;
          // if (data.transaction)
          return <Wrapped {...props} transaction={data.transaction} />;
        }}
      </Query>
    );
  }
  return <Wrapped {...props} />;
};

const withAddMutation = Wrapped => props => (
  <Mutation
    mutation={ADD_MUTATION}
    update={(cache, { data: { addTransaction } }) => {
      const { transactions } = cache.readQuery({
        query: LIST_QUERY,
        variables: { dateStart: new Date('2018-01-01').toISOString() },
      });
      cache.writeQuery({
        query: LIST_QUERY,
        variables: { dateStart: new Date('2018-01-01').toISOString() },
        data: {
          transactions: transactions.concat(addTransaction.transaction),
        },
      });
    }}
  >
    {(addTransaction, { loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return error.message;
      if (data && data.addTransaction) { // COMBAK: use variable to pathname
        return <Redirect to={{ pathname: '/transactions' }} />;
      }
      return (
        <Wrapped
          {...props}
          onCreate={(transaction) => {
            addTransaction({
              variables: { input: transaction },
            });
          }}
        />);
    }}
  </Mutation>
);

const withDeleteMutation = Wrapped => props => (
  <Mutation
    mutation={DELETE_MUTATION}
    update={(cache, { data: { deleteTransaction } }) => {
      if (!deleteTransaction.success) return;
      const { transactions } = cache.readQuery({
        query: LIST_QUERY,
        variables: { dateStart: new Date('2018-01-01').toISOString() },
      });
      cache.writeQuery({
        query: LIST_QUERY,
        variables: { dateStart: new Date('2018-01-01').toISOString() },
        data: {
          transactions: transactions.filter(t => t.id !== deleteTransaction.id),
        },
      });
    }}
  >
    {(deleteTransaction, { loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return 'Error delete mutation';
      if (data && data.deleteTransaction && data.deleteTransaction.success) {
        return <Redirect to={{ pathname: '/transactions' }} />;
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

const withUpdateMutation = Wrapped => props => (
  <Mutation mutation={UPDATE_MUTATION}>
    {(updateTransaction, { loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return error.message;
      if (data && data.updateTransaction) { // COMBAK: use variable to pathname
        return <Redirect to={{ pathname: '/transactions' }} />;
      }
      return (
        <Wrapped
          {...props}
          onSave={(id, input) => {
            updateTransaction({
              variables: { id, input },
              update: (cache, { data: { updateTransaction: result } }) => {
                const { transactions } = cache.readQuery({
                  query: LIST_QUERY,
                  variables: { dateStart: new Date('2018-01-01').toISOString() },
                });
                if (result.transaction.id !== id) {
                  cache.writeQuery({
                    query: LIST_QUERY,
                    variables: { dateStart: new Date('2018-01-01').toISOString() },
                    data: { // find updated transaction and replace this
                      transactions: transactions.map(t => (t.id === id ? result.transaction : t)),
                    },
                  });
                }
              },
            });
          }}
        />);
    }}
  </Mutation>
);

export default Component => withId(
  withQuery(
    withAddMutation(
      withDeleteMutation(
        withUpdateMutation(Component),
      ),
    ),
  ),
);
