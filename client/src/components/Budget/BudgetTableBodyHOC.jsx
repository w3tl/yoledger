import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

export const QUERY = gql`
query BudgetAccountsQuery($dateStart: Date!, $count: Int) {
  budgets(dateStart: $dateStart, count: $count) {
    accounts {
      account {
        id
        name
      }
      allocations {
        date
        amount
        balance
      }
    }
  }
}
`;

export const UPDATE_MUTATION = gql`
mutation upsertBudget($input: UpsertBudgetInput!) {
  upsertBudget(input: $input) {
    success
  }
}
`;

// eslint-disable-next-line react/prop-types
const withQuery = Component => ({ dateStart, count, ...other }) => (
  <Query query={QUERY} variables={{ dateStart, count }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return 'Error!';
      return (
        <Component {...data.budgets} {...other} />
      );
    }}
  </Query>
);

const withUpdateMutation = Component => props => (
  <Mutation mutation={UPDATE_MUTATION}>
    {(upsertBudget, { loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return 'Error mutation!';
      if (data && data.upsertBudget) {
        console.log(data);
      }
      return (
        <Component
          {...props}
          onUpdate={upsertBudget}
        />);
    }}
  </Mutation>
);

export default Component => withQuery(withUpdateMutation(Component));
