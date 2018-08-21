import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import fragments from './fragments';

export const QUERY = gql`
query TransactionsQuery($dateStart: Date!, $dateEnd: Date, $page: Int, $itemsPerPage: Int) {
  transactions(dateStart: $dateStart, dateEnd: $dateEnd, page: $page, itemsPerPage: $itemsPerPage) {
    ...TransactionFormTransaction
  }
}
${fragments.transaction}
`;

const withQuery = Component => props => (
  <Query query={QUERY} variables={{ dateStart: new Date('2018-01-01').toISOString() }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return error.message;

      return (
        <Component transactions={data.transactions} {...props} />
      );
    }}
  </Query>
);

export default Component => withQuery(Component);
