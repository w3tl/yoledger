/* eslint-disable react/destructuring-assignment,react/prop-types */
import React from 'react';
import { Mutation, compose } from 'react-apollo';
import {
  LIST_QUERY, ADD_MUTATION, UPDATE_MUTATION, DELETE_MUTATION,
} from './queries';
import TransactionForm from './TransactionForm';

const updateAfterAdd = ({ dateStart, dateEnd }) => (cache, { data: { addTransaction } }) => {
  const variables = { dateStart, dateEnd };
  let transactions = [];
  try {
    const data = cache.readQuery({ query: LIST_QUERY, variables });
    transactions = data.transactions; // eslint-disable-line prefer-destructuring
  } catch (e) {} // eslint-disable-line no-empty
  const data = { transactions: transactions.concat(addTransaction.transaction) };
  cache.writeQuery({ query: LIST_QUERY, variables, data });
};

const updateAfterDelete = ({ dateStart, dateEnd }) => (cache, { data: { deleteTransaction } }) => {
  const variables = { dateStart, dateEnd };
  if (!deleteTransaction.success) return;
  const { transactions } = cache.readQuery({ query: LIST_QUERY, variables });
  const data = {
    transactions: transactions.filter(t => t.id !== deleteTransaction.id),
  };
  cache.writeQuery({ query: LIST_QUERY, variables, data });
};

const updateAfterUpdate = (idBeforeUpdate, variables) => (
  cache, { data: { updateTransaction } },
) => {
  const { transaction } = updateTransaction;
  const { transactions } = cache.readQuery({ query: LIST_QUERY, variables });
  if (transaction.id === idBeforeUpdate) return;
  // find updated transaction and replace this
  const data = { transactions: transactions.map(t => (t.id === idBeforeUpdate ? transaction : t)) };
  cache.writeQuery({ query: LIST_QUERY, variables, data });
};

const withAdd = Wrapped => props => (
  <Mutation mutation={ADD_MUTATION} update={updateAfterAdd(props)}>
    {(addTransaction, { loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return error.message;
      if (data && data.addTransaction) { // COMBAK: use variable to pathname
        // props.onClose();
      }
      return (
        <Wrapped
          onCreate={(transaction) => {
            addTransaction({ variables: { input: transaction } });
          }}
          {...props}
        />);
    }}
  </Mutation>
);

const withDelete = Wrapped => props => (
  <Mutation mutation={DELETE_MUTATION} update={updateAfterDelete(props)}>
    {(deleteTransaction, { loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return 'Error delete mutation';
      const wasDeleted = data && data.deleteTransaction && data.deleteTransaction.success;
      if (wasDeleted && props.onClose) {
        props.onClose();
      }
      if (props.transaction) {
        return (
          <Wrapped
            onDelete={() => deleteTransaction({ variables: { id: props.transaction.id } })}
            {...props}
          />);
      }
      return <Wrapped {...props} />;
    }}
  </Mutation>
);

const withUpdate = Wrapped => props => (
  <Mutation mutation={UPDATE_MUTATION}>
    {(updateTransaction, { loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return error.message;
      if (data && data.updateTransaction && props.onClose) { // COMBAK: use variable to pathname
        props.onClose();
      }
      const variables = {
        dateStart: props.dateStart,
        dateEnd: props.dateEnd,
      };

      return (
        <Wrapped
          {...props}
          onSave={(id, input) => {
            updateTransaction({
              variables: { id, input },
              update: updateAfterUpdate(id, variables),
            });
          }}
        />);
    }}
  </Mutation>
);

export default compose(withAdd, withDelete, withUpdate)(TransactionForm);
