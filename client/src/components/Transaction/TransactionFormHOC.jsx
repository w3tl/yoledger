/* eslint-disable react/destructuring-assignment,react/prop-types */
import React from 'react';
import { Mutation, compose } from 'react-apollo';
import {
  LIST_QUERY, ADD_MUTATION, UPDATE_MUTATION, DELETE_MUTATION,
} from './queries';
import TransactionForm from './TransactionForm';

export const updateAfterAdd = ({ dateStart, dateEnd }) => (cache, { data: { addTransaction } }) => {
  const variables = { dateStart, dateEnd };
  let transactions = [];
  try {
    const data = cache.readQuery({ query: LIST_QUERY, variables });
    transactions = data.transactions; // eslint-disable-line prefer-destructuring
  } catch (e) {} // eslint-disable-line no-empty
  const data = { transactions: transactions.concat(addTransaction.transaction) };
  cache.writeQuery({ query: LIST_QUERY, variables, data });
};

export const updateAfterDelete = props => (cache, { data: { deleteTransaction } }) => {
  const variables = { dateStart: props.dateStart, dateEnd: props.dateEnd };
  if (!deleteTransaction.success) return;
  const { transactions } = cache.readQuery({ query: LIST_QUERY, variables });
  const data = {
    transactions: transactions.filter(t => t.id !== deleteTransaction.id),
  };
  cache.writeQuery({ query: LIST_QUERY, variables, data });
};

export const updateAfterUpdate = ({ transaction: trans, dateStart, dateEnd }) => (
  cache, { data: { updateTransaction } },
) => {
  const variables = { dateStart, dateEnd };
  const { transaction: newTrans } = updateTransaction;
  // TODO: update form query
  const { transactions } = cache.readQuery({ query: LIST_QUERY, variables });
  if (newTrans.id === trans.id) return;
  // find updated transaction and replace this
  const data = {
    transactions: transactions.map(t => (t.id === trans.id ? newTrans : t)),
  };
  cache.writeQuery({ query: LIST_QUERY, variables, data });
};

const withAdd = Wrapped => props => (
  <Mutation mutation={ADD_MUTATION} update={updateAfterAdd(props)}>
    {(addTransaction, { loading, error }) => (
      <Wrapped
        onCreate={addTransaction}
        {...props}
        loading={loading || props.loading}
        error={error || props.error}
      />)}
  </Mutation>
);

const withDelete = Wrapped => props => (
  <Mutation mutation={DELETE_MUTATION} update={updateAfterDelete(props)}>
    {(deleteTransaction, { loading, error, data }) => {
      const wasDeleted = data && data.deleteTransaction && data.deleteTransaction.success;
      if (wasDeleted && props.onClose) {
        props.onClose();
      }
      if (props.transaction) {
        return (
          <Wrapped
            onDelete={deleteTransaction}
            {...props}
            loading={loading || props.loading}
            error={error || props.error}
          />);
      }
      return <Wrapped {...props} />;
    }}
  </Mutation>
);

const withUpdate = Wrapped => props => (
  <Mutation mutation={UPDATE_MUTATION} update={updateAfterUpdate(props)}>
    {(updateTransaction, { loading, error, data }) => {
      if (data && data.updateTransaction && props.onClose) { // COMBAK: use variable to pathname
        props.onClose();
      }
      return (
        <Wrapped
          onSave={updateTransaction}
          {...props}
          loading={loading || props.loading}
          error={error || props.error}
        />);
    }}
  </Mutation>
);

export default compose(withAdd, withDelete, withUpdate)(TransactionForm);
