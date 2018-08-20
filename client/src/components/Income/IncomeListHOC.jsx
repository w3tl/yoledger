import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import fragments from './fragments';

export const QUERY = gql`
query IncomesQuery {
  accounts(type: INCOME) {
    ...IncomeAccount
  }
}
${fragments.income}
`;

const withQuery = Component => props => (
  <Query query={QUERY}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return 'Error!';

      return (
        <Component incomes={data.accounts} {...props} />
      );
    }}
  </Query>
);

export default Component => withQuery(Component);
