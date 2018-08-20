import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import fragments from './fragments';

export const QUERY = gql`
query ExpensesQuery {
  accounts(type: EXPENSE) {
    ...ExpenseAccount
  }
}
${fragments.expense}
`;

const withQuery = Component => props => (
  <Query query={QUERY}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return 'Error!';

      return (
        <Component expenses={data.accounts} {...props} />
      );
    }}
  </Query>
);

export default Component => withQuery(Component);
