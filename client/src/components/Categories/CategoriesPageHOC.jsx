import React from 'react';
import { Query, Mutation, compose } from 'react-apollo';
import { LIST_QUERY, ADD_MUTATION } from './queries';
import CategoriesPage from './CategoriesPage';

export const updateAfterAdd = (cache, { data: { addAccount: { account } } }) => {
  const { expenses, incomes } = cache.readQuery({ query: LIST_QUERY });
  const data = {
    expenses: account.type === 'EXPENSE' ? expenses.concat(account) : expenses,
    incomes: account.type === 'INCOME' ? incomes.concat(account) : incomes,
  };
  cache.writeQuery({ query: LIST_QUERY, data });
};

const withQuery = Wrapped => props => (
  <Query query={LIST_QUERY}>
    {({ loading, error, data }) => (
      <Wrapped
        expenses={data.expenses}
        incomes={data.incomes}
        {...props}
        error={{ query: error, ...props.error }}
        loading={{ list: loading, ...props.loading }}
      />
    )}
  </Query>
);

const withAddMutation = Wrapped => props => (
  <Mutation mutation={ADD_MUTATION} update={updateAfterAdd}>
    {(addAccount, { loading, error }) => (
      <Wrapped
        onCreate={addAccount}
        {...props}
        error={{ mutation: error, ...props.error }}
        loading={{ mutation: loading, ...props.loading }}
      />
    )}
  </Mutation>
);

export default compose(withQuery, withAddMutation)(CategoriesPage);
