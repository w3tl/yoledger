import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const QUERY = gql`
query BudgetPeriodsQuery($dateStart: Date!, $count: Int) {
  budgets(dateStart: $dateStart, count: $count) {
    periods
  }
}
`;

// eslint-disable-next-line react/prop-types
const withQuery = Component => ({ dateStart, count, ...other }) => (
  <Query query={QUERY} variables={{ dateStart, count }}>
    {({
      loading, error, data,
    }) => {
      if (loading) return 'Loading...';
      if (error) return 'Error!';
      return (
        <Component dateStart={dateStart} count={count} {...data.budgets} {...other} />
      );
    }}
  </Query>);

export default Component => withQuery(Component);
